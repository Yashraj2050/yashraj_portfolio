'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'deepfake' | 'sweep' | 'system';

interface TabConfig {
  id: TabType;
  label: string;
  actionText: string;
  initialLogs: string[];
}

const tabsConfig: TabConfig[] = [
  {
    id: 'deepfake',
    label: 'Deepfake',
    actionText: 'Verify Media Hash',
    initialLogs: [
      'SYSTEM IDLE. AWAITING DATA VECTOR...',
      'READY: MesoNet / XceptionNet models loaded.',
      'READY: Blockchain provenance protocol set.',
    ],
  },
  {
    id: 'sweep',
    label: 'Sweep',
    actionText: 'Perform Threat Sweep',
    initialLogs: [
      'SYSTEM IDLE. AWAITING THREAT VECTOR...',
      'READY: 0-Trust onion routing nodes ready.',
      'READY: ECDSA signature checking system active.',
    ],
  },
  {
    id: 'system',
    label: 'System',
    actionText: 'Dump Hardware Log',
    initialLogs: [
      'SYSTEM IDLE. AWAITING HARDWARE INTERRUPT...',
      'READY: BIOS diagnostics core initialized.',
      'READY: Devices check - status: GREEN.',
    ],
  },
];

export function InteractiveConsole() {
  const [activeTab, setActiveTab] = useState<TabType>('deepfake');
  const [status, setStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>(tabsConfig[0].initialLogs);
  
  const progressRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronized via tab button onClick

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const runSimulation = () => {
    if (status === 'running') return;
    
    setStatus('running');
    setProgress(0);
    progressRef.current = 0;
    
    // Set up tab-specific step logs
    let stepLogs: { triggerPct: number; text: string }[] = [];
    
    if (activeTab === 'deepfake') {
      setLogs(['[SYS-OK] STARTING MEDIA AUTOPROV SWEEP...', 'LOADING MESONET MODEL WEIGHTS...']);
      stepLogs = [
        { triggerPct: 20, text: '[ANALYSIS] Running XceptionNet classifier...' },
        { triggerPct: 40, text: '[DEEPLEARN] Sweeping video keyframes for micro-tampering...' },
        { triggerPct: 60, text: '[WEB3] Packaging media hash into payload vector...' },
        { triggerPct: 80, text: '[BLOCKCHAIN] Broadcasting block to local smart contract...' },
        { triggerPct: 100, text: '[RESULT] MesoNet verification: 98.43% GENUINE / 1.57% TAMPERED' },
        { triggerPct: 100, text: '[RESULT] Cryptographic provenance lock successfully secured!' },
      ];
    } else if (activeTab === 'sweep') {
      setLogs(['[SYS-OK] BOOTSTRAPPING ENDPOINT SECURE DIAL...', 'RESOLVING ONION ROUTING INTERFACES...']);
      stepLogs = [
        { triggerPct: 20, text: '[TRACE] Routing packet -> Node-01 [104.28.3.1]' },
        { triggerPct: 45, text: '[TRACE] Routing packet -> Node-02 [182.52.9.11]' },
        { triggerPct: 65, text: '[SEC-HANDSHAKE] Verifying peer keys (ECDSA P-256)' },
        { triggerPct: 85, text: '[STATUS] zero-trust token handshake: AUTHORIZED' },
        { triggerPct: 100, text: '[RESULT] Threats checked: 0 intrusions. Node tunnel secure.' },
      ];
    } else {
      setLogs(['[SYS-OK] REQUSTING HARDWARE LOG EXPORT...', 'COMMENCING KERNEL MEMORY SWEEP...']);
      stepLogs = [
        { triggerPct: 25, text: '[BIOS] Reading register matrix at 0x7FFA89B00F...' },
        { triggerPct: 50, text: '[MEMORY] L1/L2 Cache speeds: 124 GB/s nominal' },
        { triggerPct: 75, text: '[THERMAL] Temp core checks: CPU 38°C | GPU 41°C' },
        { triggerPct: 100, text: '[RESULT] Diagnostics OK. Core clock stabilized at 4.20GHz.' },
      ];
    }

    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      progressRef.current += 4;
      const currentPct = Math.min(progressRef.current, 100);
      setProgress(currentPct);

      // Check if we should append any log step based on percentage reached
      stepLogs.forEach((log) => {
        if (currentPct >= log.triggerPct) {
          setLogs((prev) => {
            if (prev.includes(log.text)) return prev;
            return [...prev, log.text].slice(-5); // Keep the last 5 logs for styling limit
          });
        }
      });

      if (currentPct >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setStatus('completed');
      }
    }, 150);
  };

  const resetConsole = () => {
    setStatus('idle');
    setProgress(0);
    progressRef.current = 0;
    const config = tabsConfig.find((t) => t.id === activeTab);
    if (config) {
      setLogs(config.initialLogs);
    }
  };

  const activeConfig = tabsConfig.find((t) => t.id === activeTab);

  return (
    <div className="relative w-full max-w-[340px] p-5 rounded-xl border border-white/5 bg-[#08080c]/60 backdrop-blur-xl shadow-2xl pointer-events-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
          <span className="text-[10px] text-white/50 font-code tracking-widest uppercase">
            Systems Console
          </span>
        </div>
        <span className="text-[8px] text-white/20 font-code tracking-wider">
          STATUS: {status === 'running' ? 'SCANNING' : status === 'completed' ? 'SECURED' : 'ONLINE'}
        </span>
      </div>

      {/* Tabs Row */}
      <div className="grid grid-cols-3 gap-1 mb-4 bg-white/[0.02] p-0.5 rounded-lg border border-white/[0.04]">
        {tabsConfig.map((tab) => (
          <button
            key={tab.id}
            disabled={status === 'running'}
            onClick={() => {
              setActiveTab(tab.id);
              setLogs(tab.initialLogs);
            }}
            className={`py-1.5 text-[9px] font-code tracking-wider uppercase rounded-md cursor-pointer transition-all ${
              activeTab === tab.id
                ? 'bg-white/[0.06] text-white/90 border border-white/5'
                : 'text-white/35 hover:text-white/60 border border-transparent disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Console Display Screen */}
      <div className="h-28 rounded-lg bg-[#040407]/90 border border-white/[0.03] p-3 mb-4 flex flex-col justify-between overflow-hidden relative">
        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 bg-scanline pointer-events-none opacity-5" />

        <div className="space-y-1.5 font-code text-[9px] text-white/40 leading-normal overflow-y-auto scrollbar-none">
          <AnimatePresence mode="popLayout">
            {logs.map((log, i) => (
              <motion.div
                key={`${log}-${i}`}
                initial={{ opacity: 0, x: 4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={
                  log.startsWith('[RESULT]')
                    ? 'text-emerald-400 font-medium'
                    : log.startsWith('[SYS-OK]') || log.startsWith('READY')
                    ? 'text-white/60'
                    : 'text-white/40'
                }
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Bar (Hidden when idle) */}
      <div className="h-6 mb-4 flex items-center">
        <AnimatePresence mode="wait">
          {status !== 'idle' ? (
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
            >
              <div className="flex items-center justify-between text-[8px] font-code text-white/35 mb-1">
                <span>{status === 'running' ? 'COMPUTING VECTOR...' : 'TASK COMPLETED'}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/[0.03] border border-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-white/10 via-white/40 to-white/10"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="text-[8px] font-code text-white/20 uppercase tracking-widest text-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Ready to execute operations
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Button */}
      <button
        onClick={status === 'completed' ? resetConsole : runSimulation}
        disabled={status === 'running'}
        className={`w-full py-2.5 rounded-lg border text-[10px] font-code tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
          status === 'running'
            ? 'bg-white/[0.01] border-white/5 text-white/30 cursor-not-allowed'
            : status === 'completed'
            ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40'
            : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06] hover:border-white/20'
        }`}
      >
        <span>{status === 'completed' ? 'Reset Console' : activeConfig?.actionText}</span>
        {status === 'running' && (
          <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-ping" />
        )}
      </button>
    </div>
  );
}
