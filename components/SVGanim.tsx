/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  User,
  Mail,
  Calendar,
  CheckSquare,
  Users,
  Bell,
} from "lucide-react";
import { 
  IconBrandOpenai, 
  IconBrandGoogle, 
  IconBrandWhatsapp, 
  IconBrandGoogleDrive, 
  IconBrandNotion 
} from '@tabler/icons-react';

export default function SystemFlowDiagramWireframe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const [flowTick, setFlowTick] = useState(0);
  useEffect(() => {
    const flow = setInterval(() => setFlowTick((t) => t + 1), 5000);
    return () => clearInterval(flow);
  }, []);

  // Detect Safari on client only. Default to SVG-only boxes for SSR + first render
  // to keep server and client HTML identical during hydration.
  const [isSafari, setIsSafari] = useState<boolean | null>(null);
  useEffect(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const safari = /^((?!chrome|android).)*safari/i.test(ua);
    setIsSafari(safari);
  }, []);

  // Layout coordinates
  const layout = useMemo(
    () => ({
      user: { x: 1, y: -300 },
      whatsapp: { x: 2, y: -150 },
      synklist: { x: 0, y: 0 },
      ai: [
        { id: "openai", label: "OpenAI", x: -300, y: -150, logo: <IconBrandOpenai size={18}/> },
        { id: "anthropic", label: "Anthropic", x: -300, y: 1, logo: "AI" },
        { id: "gemini", label: "Gemini", x: -300, y: 150, logo: <IconBrandGoogle size={18} fill="white"/> },
      ],
      integrations: [
        { id: "gmail", label: "Gmail", x: 300, y: -200, icon: <Mail size={18}/> },
        { id: "calendar", label: "Calendar", x: 300, y: -100, icon: <Calendar size={18}/> },
        { id: "drive", label: "Drive", x: 300, y: 1, icon: <IconBrandGoogleDrive size={18}/> },
        { id: "teams", label: "Teams", x: 300, y: 100, icon: <Users size={18}/> },
        { id: "notion", label: "Notion", x: 300, y: 200, icon: <IconBrandNotion size={18}/> },
      ],
      bottom: [
        { id: "tasks", label: "Tasks", x: 1, y: 150, icon: <CheckSquare size={18}/> },
        { id: "reminders", label: "Reminders", x: 1, y: 300, icon: <Bell size={18}/> },
      ],
    }),
    []
  );

  // Connection path
  function Connection({ from, to }: { from: { x: number; y: number }, to: { x: number; y: number } }) {
    const midX = (from.x + to.x) / 2;
    const pathD = `M ${from.x},${from.y} C ${midX},${from.y} ${midX},${to.y} ${to.x},${to.y}`;

    return (
      <motion.path
        d={pathD}
        fill="none"
        stroke="url(#glowGradient)"
        strokeWidth={2}
        strokeOpacity={0.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />
    );
  }

  // Safari-safe box
  function SvgBox({ x, y, label, main }: { x:number, y:number, label:string, main?:boolean }) {
    const width = main ? 160 : 120;
    const height = main ? 70 : 60;
    return (
      <g transform={`translate(${x},${y})`}>
        <rect
          x={-width/2}
          y={-height/2}
          width={width}
          height={height}
          rx={main ? 16 : 12}
          ry={main ? 16 : 12}
          fill="url(#boxBg)"
          stroke="#d4d4d8"
          strokeWidth="1.5"
        />
        <text
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={main ? 14 : 12}
          fontFamily="monospace"
          fill="#27272a"
          fontWeight={main ? 700 : 400}
        >
          {label}
        </text>
      </g>
    )
  }

  // Original foreignObject box
  function HtmlBox({ x, y, label, icon, logo, main }: { 
    x:number, y:number, label:string, icon?:React.ReactNode, logo?:React.ReactNode, main?:boolean 
  }) {
    return (
      <motion.g
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
        transition={{ duration: 0.6 }}
      >
        <foreignObject
          x={x - (main ? 80 : 60)}
          y={y - (main ? 35 : 30)}
          width={main ? 160 : 120}
          height={main ? 70 : 60}
          overflow="visible"
        >
          <div
            className={`flex flex-col items-center justify-center w-full h-full 
              ${main ? "rounded-2xl" : "rounded-xl"} 
              border bg-gradient-to-br from-zinc-100/70 via-white/60 to-zinc-100/70 
              border-zinc-300/60 backdrop-blur-xl shadow-md`}
          >
            {main ? (
              <div className="text-lg font-bold font-mono text-zinc-800">{label}</div>
            ) : (
              <>
                <div className="text-zinc-700 mb-1">{icon ?? logo}</div>
                <div className="text-xs font-mono text-zinc-700">{label}</div>
              </>
            )}
          </div>
        </foreignObject>
      </motion.g>
    )
  }

  return (
    <section
      ref={containerRef}
      className="overflow-hidden bg-gradient-to-b from-white via-zinc-50/30 to-white"
    >
      <svg className="inset-0 w-full h-full" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3f3f46" stopOpacity="0" />
            <stop offset="50%" stopColor="#18181b" stopOpacity="0.8">
              <animate attributeName="offset" values="0;1;0" dur="3s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" stopColor="#3f3f46" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="boxBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#f4f4f5" stopOpacity="0.8"/>
          </linearGradient>
        </defs>

        {/* Connections */}
        <Connection from={layout.user} to={layout.whatsapp}/>
        <Connection from={layout.whatsapp} to={layout.synklist}/>
        {layout.ai.map((n)=> <Connection key={n.id} from={layout.synklist} to={n}/>)}
        {layout.integrations.map((n)=> <Connection key={n.id} from={layout.synklist} to={n}/>)}
        {layout.bottom.map((n)=> <Connection key={n.id} from={layout.synklist} to={n}/>)}

        {/* Nodes */}
        {/*
          Render SVG boxes by default (SSR and first client render) to keep
          markup stable for hydration. After mount, if we detect non-Safari,
          switch to HTML boxes which use foreignObject for richer styling.
        */}
        {isSafari === false ? (
          <>
            <HtmlBox x={layout.user.x} y={layout.user.y} label="User" icon={<User size={20}/>}/>
            <HtmlBox x={layout.whatsapp.x} y={layout.whatsapp.y} label="WhatsApp" icon={<IconBrandWhatsapp size={20}/>}/>
            <HtmlBox x={layout.synklist.x} y={layout.synklist.y} label="SynkList" main/>
            {layout.ai.map((n)=> <HtmlBox key={n.id} x={n.x} y={n.y} label={n.label} logo={n.logo}/>)}
            {layout.integrations.map((n)=> <HtmlBox key={n.id} x={n.x} y={n.y} label={n.label} icon={n.icon}/>)}
            {layout.bottom.map((n)=> <HtmlBox key={n.id} x={n.x} y={n.y} label={n.label} icon={n.icon}/>)}
          </>
        ) : (
          <>
            <SvgBox x={layout.user.x} y={layout.user.y} label="User"/>
            <SvgBox x={layout.whatsapp.x} y={layout.whatsapp.y} label="WhatsApp"/>
            <SvgBox x={layout.synklist.x} y={layout.synklist.y} label="SynkList" main/>
            {layout.ai.map((n)=> <SvgBox key={n.id} x={n.x} y={n.y} label={n.label}/>)}
            {layout.integrations.map((n)=> <SvgBox key={n.id} x={n.x} y={n.y} label={n.label}/>)}
            {layout.bottom.map((n)=> <SvgBox key={n.id} x={n.x} y={n.y} label={n.label}/>)}
          </>
        )}
      </svg>
    </section>
  );
}
