import React, { useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage, Blob } from '@google/genai';

interface LiveVoiceAssistantProps {
  isActive: boolean;
  onClose: () => void;
}

// Utility functions for audio encoding/decoding
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const SYSTEM_INSTRUCTION = `
You are the "arm COFFEE" AI Business Partner and Voice Assistant. 
You are currently in hands-free voice-only mode.
Be concise, articulate, and helpful. Use a sophisticated yet friendly tone.
Your goal is to help the user navigate the platform and understand the investment benefits of arm COFFEE.
Ecosystem info: AED 75k entry, AED 6k monthly salary, 2 Emirates IDs.
Keep responses short for better voice flow.
`;

const LiveVoiceAssistant: React.FC<LiveVoiceAssistantProps> = ({ isActive, onClose }) => {
  const sessionRef = useRef<any>(null);
  const audioContextsRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    if (!isActive) {
      if (sessionRef.current) {
        sessionRef.current.close();
        sessionRef.current = null;
      }
      return;
    }

    const startSession = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        if (!audioContextsRef.current) {
          audioContextsRef.current = {
            input: new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 }),
            output: new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 }),
          };
        }

        const { input: inputAudioContext, output: outputAudioContext } = audioContextsRef.current;
        
        // Ensure fresh GoogleGenAI instance on every connection attempt
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const sessionPromise = ai.live.connect({
          model: 'gemini-2.5-flash-native-audio-preview-12-2025',
          callbacks: {
            onopen: () => {
              console.log('Voice session opened');
              const source = inputAudioContext.createMediaStreamSource(stream);
              const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
              
              scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                const l = inputData.length;
                const int16 = new Int16Array(l);
                for (let i = 0; i < l; i++) {
                  int16[i] = inputData[i] * 32768;
                }
                const pcmBlob: Blob = {
                  data: encode(new Uint8Array(int16.buffer)),
                  mimeType: 'audio/pcm;rate=16000',
                };
                
                sessionPromise.then((session) => {
                  if (session) {
                    session.sendRealtimeInput({ media: pcmBlob });
                  }
                }).catch(err => {
                  // Catch any potential send errors silently or log them
                });
              };
              
              source.connect(scriptProcessor);
              scriptProcessor.connect(inputAudioContext.destination);
            },
            onmessage: async (message: LiveServerMessage) => {
              // Deep null checks for message properties to avoid "Cannot read properties of undefined (reading 'data')"
              const modelTurn = message?.serverContent?.modelTurn;
              const parts = modelTurn?.parts;
              
              if (parts && Array.isArray(parts)) {
                for (const part of parts) {
                  if (part?.inlineData?.data) {
                    const base64EncodedAudioString = part.inlineData.data;
                    nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContext.currentTime);
                    
                    try {
                      const audioBuffer = await decodeAudioData(
                        decode(base64EncodedAudioString),
                        outputAudioContext,
                        24000,
                        1
                      );
                      const source = outputAudioContext.createBufferSource();
                      source.buffer = audioBuffer;
                      source.connect(outputAudioContext.destination);
                      source.addEventListener('ended', () => {
                        sourcesRef.current.delete(source);
                      });
                      source.start(nextStartTimeRef.current);
                      nextStartTimeRef.current += audioBuffer.duration;
                      sourcesRef.current.add(source);
                    } catch (decodeError) {
                      console.error("Audio decoding failed:", decodeError);
                    }
                  }
                }
              }

              if (message?.serverContent?.interrupted) {
                for (const source of sourcesRef.current.values()) {
                  try { source.stop(); } catch (e) {}
                }
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
              }
            },
            onerror: (e) => {
              const errorMessage = e instanceof Error ? e.message : String(e);
              console.error('Voice error reported:', errorMessage);
              
              if (errorMessage.toLowerCase().includes("permission") || errorMessage.toLowerCase().includes("403")) {
                console.error("CRITICAL: Permission Denied. Check your Gemini API Key billing status or model availability.");
              }
            },
            onclose: (e) => {
              console.log('Voice session closed');
              onClose();
            },
          },
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
            },
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });

        sessionRef.current = await sessionPromise;
      } catch (err) {
        console.error('Failed to initiate voice assistant session:', err);
        onClose();
      }
    };

    startSession();

    return () => {
      if (sessionRef.current) {
        sessionRef.current.close();
      }
    };
  }, [isActive, onClose]);

  return null;
};

export default LiveVoiceAssistant;