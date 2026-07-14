type Props = { text: string; onClick: () => void };

export default function GoogleButton({ text, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-14 items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
    >
      <svg className="h-5 w-5" viewBox="0 0 48 48">
        <path
          fill="#FFC107"
          d="M43.6 20.5H42V20H24v8h11.3C33.7 32.5 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.2-.4-3.5z"
        />
        <path
          fill="#FF3D00"
          d="M6.3 14.7l6.6 4.8C14.5 16 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5 0 9.7-1.9 13.2-5.1l-6.1-5.1C29.2 35.5 26.7 36 24 36c-5.1 0-9.4-3.4-11-8.1l-6.6 5.1C9.7 39.7 16.3 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.2 5.3-6.1 6.8l6.1 5.1C38.9 36.4 44 31 44 24c0-1.3-.1-2.2-.4-3.5z"
        />
      </svg>
      {text}
    </button>
  );
}
