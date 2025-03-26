import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Message as AIMessage } from 'ai';
import { ReactNode } from 'react';

export interface ExtendedMessage extends AIMessage {
  display?: ReactNode;
}
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
