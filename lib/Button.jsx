
export const Button = ({ children, onClick, focus = false }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-neutral-900 px-8 py-3 w-40 font-semibold rounded-md
        text-neutral-300 transition-all
        hover:bg-cyan-800 hover:text-cyan-300
        ${focus ? "focus:bg-cyan-800 focus:text-cyan-300" : ""}`}
    >
      {children}
    </button>
  );
};

// className="hover:bg-cyan-700 hover:text-cyan-200 bg-neutral-900 font-semibold px-8 py-3 w-40
//       rounded-md text-neutral-50 transition-all"
