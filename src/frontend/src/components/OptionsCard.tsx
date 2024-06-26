import { cn } from '@/lib/utils'
import Image from 'next/image'

type MeetingOptionCardProps = {
  className: string
  imgUrl: string
  title: string
  description: string
  handleClick: () => void
}
const OptionsCard = ({ className, imgUrl, title, description, handleClick }: MeetingOptionCardProps) => {
  return (
    <div
      className={cn(
        'px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-2xl cursor-pointer ',
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center glassmorphic-bg border-none size-12 rounded-xl">
        <Image src={imgUrl} alt="meeting" width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  )
}

export default OptionsCard
