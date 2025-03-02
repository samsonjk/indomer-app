export default function SessionManager({
    sessionName,
    setSessionName,
    saveSession,
  }: {
    sessionName: string;
    setSessionName: (name: string) => void;
    saveSession: () => void;
  }) {
    return (
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Session Name"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={saveSession}
          className="bg-green-500 text-white p-2 rounded"
        >
          Save Session
        </button>
      </div>
    );
  }
  