export default function FrierenDivider() {
  return (
    <div className="flex items-center justify-center w-full max-w-4xl mx-auto my-20 px-6">
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-sage/35 to-transparent" />
      <div className="flex items-center gap-3 mx-6">
        <div className="w-[3px] h-[3px] bg-sage rounded-full" />
        <div className="w-[6px] h-[6px] bg-sage/50 rotate-45" />
        <div className="w-[3px] h-[3px] bg-sage rounded-full" />
      </div>
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-sage/35 to-transparent rotate-180" />
    </div>
  );
}
