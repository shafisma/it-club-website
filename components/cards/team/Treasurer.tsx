export default function Treasurer() {
  return (
  <div className="flex flex-col items-center gap-2 p-6 bg-rose-50 border-2 border-black rounded-[5px] text-sm font-medium text-black shadow-[4px_4px_0px_0px_black] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none text-center">
      <div className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
        <span className="text-xl font-bold text-accent">✦</span>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1">Treasurer</h3>
      <p className="text-accent font-semibold text-sm mb-1">Sayef Ciam</p>
      <p className="text-muted-foreground text-sm mb-1">Class: 9/Padma</p>
    </div>
  )
}
