
export const Button = ({ children, onClick, focus = false, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-neutral-900 px-8 py-3 w-40 font-semibold rounded-md
      transition-all
         
        ${disabled ? 'text-neutral-700' : 'text-neutral-300 hover:bg-cyan-800 hover:text-cyan-300 '}
        ${focus ? "focus:bg-cyan-800 focus:text-cyan-300" : ""}`}
    >
      {children}
    </button>
  );
};
