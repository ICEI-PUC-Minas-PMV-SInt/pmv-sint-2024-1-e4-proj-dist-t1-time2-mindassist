import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ReactNode } from 'react'
import { Button } from './ui/button'

type MeetingModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  className?: string
  buttonText?: string
  buttonIconUrl?: string
  handleClick?: () => void
  children?: ReactNode
  image?: string
}

const OptionsModal = ({
  isOpen,
  onClose,
  title,
  className,
  buttonText,
  handleClick,
  children,
  buttonIconUrl,
  image,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" width={72} height={72} />
            </div>
          )}

          <h1 className={cn('text-3xl font-bold leading-10 text-center', className)}>{title}</h1>
          {children}
          <Button className="bg-info focus-visible:ring-0 focus-visible:ring-offset-0" onClick={handleClick}>
            {buttonIconUrl && <Image src={buttonIconUrl} alt="button icon" width={13} height={13} />} &nbsp;
            {buttonText || 'Schedule Meeting'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OptionsModal
