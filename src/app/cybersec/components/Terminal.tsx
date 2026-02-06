'use client';

import { commands } from '@/app/cybersec/lib/commands';
import { Command } from '@/app/cybersec/types';
import { motion } from 'framer-motion';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import CommandInput from './CommandInput';
import FloatingButtons from './FloatingButtons';
import HistoryDisplay from './HistoryDisplay';

export default function Terminal() {
  const [history, setHistory] = useState<Command[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const effectRan = useRef(false);

  // 1. Theme & Banner Initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('colorscheme');
      if (savedTheme) {
        try {
          const theme = JSON.parse(savedTheme);
          const root = document.documentElement;
          Object.entries(theme).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value as string);
          });
        } catch (e) {
          console.error('Theme load failed', e);
        }
      }
    }

    if (effectRan.current) return;
    effectRan.current = true;

    inputRef.current?.focus();
    executeCommand('banner');
  }, []);

  // 2. Auto-Scroll & Auto-Focus
  useEffect(() => {
    if (terminalRef.current) {
      setTimeout(() => {
        terminalRef.current!.scrollTop = terminalRef.current!.scrollHeight;
      }, 50); // Increased timeout slightly for mobile rendering
    }

    if (!isLoading) {
      // Small delay helps keep keyboard open on mobile
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [history, isLoading]);

  const executeCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    if (trimmedCmd.toLowerCase() === 'clear') {
      setHistory([]);
      setTimeout(() => inputRef.current?.focus(), 10);
      return;
    }

    setIsLoading(true);

    const [commandName, ...args] = trimmedCmd.split(' ');
    const command = commands[commandName.toLowerCase()];

    let outputs: string[];

    if (command) {
      try {
        const result = await command(args);
        outputs = result.split('\n');
      } catch (error) {
        outputs = [`Error: ${error}`];
      }
    } else {
      outputs = [`Command not found: ${commandName}`];
    }

    setHistory((prev) => [...prev, { command: trimmedCmd, outputs }]);
    setIsLoading(false);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeCommand(currentCommand);
    setCurrentCommand('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const cmds = history.map((h) => h.command);
      if (!cmds.length) return;

      let newIndex = historyIndex;
      if (e.key === 'ArrowUp') {
        newIndex =
          historyIndex === -1 ? cmds.length - 1 : Math.max(0, historyIndex - 1);
      } else {
        newIndex = historyIndex + 1 >= cmds.length ? -1 : historyIndex + 1;
      }

      setHistoryIndex(newIndex);
      setCurrentCommand(newIndex === -1 ? '' : cmds[newIndex]);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const handleContainerClick = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    inputRef.current?.focus();
  };

  return (
    <div
      // Changed h-screen to h-[100dvh] for mobile browsers
      className="h-[100dvh] flex flex-col bg-gruvbox-bg text-gruvbox-fg font-mono p-2 md:p-6 overflow-hidden cursor-text transition-colors duration-300"
      onClick={handleContainerClick}
    >
      <motion.div className="flex-1 overflow-y-auto" ref={terminalRef}>
        <HistoryDisplay history={history} isLoading={isLoading} />

        <form onSubmit={handleSubmit} className="mt-2 pb-24 md:pb-20">
          <CommandInput
            value={currentCommand}
            onChange={setCurrentCommand}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
            disabled={isLoading}
          />
        </form>
      </motion.div>

      <FloatingButtons
        onCommandClick={(cmd) => {
          if (cmd === 'clear') {
            setHistory([]);
            inputRef.current?.focus();
            return;
          }
          executeCommand(cmd);
        }}
      />
    </div>
  );
}
