"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowUp, Bot, Sparkles } from "lucide-react";
import { displayCopy } from "../lib/ui-copy.js";
import "./MunimChat.css";

export type MunimMessage = { id: string; role: "user" | "assistant"; text: string; offerAgentSetup?: boolean };
export const munimPrompts = ["Will I have enough cash for Diwali?", "How is Dadar doing?", "Monitor stock for me"];

type Props = {
  open: boolean;
  messages: MunimMessage[];
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: (question: string) => void;
  onClose: () => void;
  onSetupAgent: () => void;
  prompts?: string[];
};

export default function MunimChat({ open, messages, draft, onDraftChange, onSend, onClose, onSetupAgent, prompts = munimPrompts }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
      composerRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
      const trigger = previousFocus.current?.isConnected && previousFocus.current !== document.body
        ? previousFocus.current
        : document.querySelector<HTMLElement>("[data-munim-chat-trigger]");
      trigger?.focus();
    }
  }, [open]);
  useEffect(() => {
    if (open && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages.length, open]);
  function send(question: string) {
    if (!question.trim()) return;
    onSend(question);
    composerRef.current?.focus();
  }
  return <dialog ref={dialogRef} className="mc-dialog" aria-labelledby="mc-title" aria-describedby="mc-description" onCancel={event => { event.preventDefault(); onClose(); }}>
    <div className="mc-pane">
      <header className="mc-header">
        <button type="button" className="mc-back" onClick={onClose} aria-label="Close Munim chat"><ArrowLeft size={21}/></button>
        <span className="mc-avatar"><Sparkles size={21}/></span>
        <div><h2 id="mc-title">Ask Munim</h2><p id="mc-description">Scripted demo responses</p></div>
      </header>
      <div className="mc-log" ref={logRef} role="log" aria-label="Conversation with Munim" aria-live="polite" aria-relevant="additions" tabIndex={0}>
        <div className="mc-intro"><span><Bot size={26}/></span><h3>Let&apos;s talk about your shop.</h3><p>Ask about your cash, outlets, or stock. I&apos;ll help you see the next step.</p></div>
        {messages.length === 0 && <div className="mc-suggestions" aria-label="Suggested questions">{prompts.map(prompt => <button type="button" key={prompt} onClick={() => send(prompt)}>{prompt}</button>)}</div>}
        {messages.map(message => <article className={"mc-message mc-message-" + message.role} key={message.id}>
          <b>{message.role === "user" ? "You" : "Munim"}</b><p>{message.role === "assistant" ? displayCopy(message.text) : message.text}</p>
          {message.offerAgentSetup && <button type="button" className="mc-setup" onClick={() => { dialogRef.current?.close(); onSetupAgent(); }}>Set up a stock agent<Bot size={16}/></button>}
        </article>)}
      </div>
      <form className="mc-composer" onSubmit={event => { event.preventDefault(); send(draft); }}>
        <label htmlFor="mc-question">Your message</label>
        <div><textarea id="mc-question" ref={composerRef} value={draft} onChange={event => onDraftChange(event.target.value)} placeholder="Ask about your shop…" rows={2} maxLength={1500} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send(draft); } }}/><button type="submit" disabled={!draft.trim()}><ArrowUp size={18}/><span>Send</span></button></div>
        <small>Setup needs your choices. Orders and payments need approval.</small>
      </form>
    </div>
  </dialog>;
}
