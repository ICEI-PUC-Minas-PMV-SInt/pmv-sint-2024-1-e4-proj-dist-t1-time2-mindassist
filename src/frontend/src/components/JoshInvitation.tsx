import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function JoshInvitation() {
  return (
    <div className="flex gap-3 text-sm whitespace-pre-wrap">
      <Avatar className="border-2 border-slate-800">
        <AvatarFallback>{'JOSH'}</AvatarFallback>
        <AvatarImage src={'/images/josh.png'} />
      </Avatar>
      <p className="leading-snug">
        <span className="block font-bold pb-1">Josh:</span>
        Me faça alguma pergunta ou me conte algo para que eu possa te ajudar.
      </p>
    </div>
  )
}
