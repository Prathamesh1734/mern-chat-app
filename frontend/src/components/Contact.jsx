import Avatar from "./Avatar";

export function Contact({ id, username, onClick, selected, online }) {
  return (
    <div
      onClick={() => {
        onClick(id);
      }}
      key={id}
      className={
        "border-b border-gray-100 dark:border-gray-600 flex items-center gap-2 cursor-pointer " +
        (selected ? "bg-blue-50 dark:bg-[#262626]" : "")
      }
    >
      {selected && (
        <div className="w-1 bg-blue-500 h-12 rounded-r-md dark:bg-slate-500"></div>
      )}
      <div className="flex gap-2 py-2 pl-4 items-center">
        <Avatar online={online} username={username} userId={id} />
        <span className="text-gray-800 dark:text-white">{username}</span>
      </div>
    </div>
  );
}
