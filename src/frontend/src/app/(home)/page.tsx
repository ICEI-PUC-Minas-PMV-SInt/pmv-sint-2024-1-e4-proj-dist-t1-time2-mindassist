'use client'
import AppOptionsSection from '@/components/AppOptionsSection'
import { cn } from '@/lib/utils'
import { JetBrains_Mono as FontMono } from 'next/font/google'
import { useEffect, useState } from 'react'

import { Temporal } from 'temporal-polyfill'

const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['500'],
})

const formatDate = () => {
  const date = Temporal.Now.plainDateISO()
  return date.toLocaleString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const formatTime = () => {
  const time = Temporal.Now.plainTimeISO()
  const formattedTime = time.toLocaleString('pt-BR', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  })

  return formattedTime
}

type DateTimeType = 'date' | 'time' | 'both'
function getCurrentDateTime(type: 'date'): string
function getCurrentDateTime(type: 'time'): string
function getCurrentDateTime(type: 'both'): { date: string; time: string }
function getCurrentDateTime(type: DateTimeType = 'both'): any {
  switch (type) {
    case 'date':
      return formatDate()
    case 'time':
      return formatTime()
    default:
      return {
        time: formatTime(),
        date: formatDate(),
      }
  }
}

const Home = () => {
  const [time, setTime] = useState(getCurrentDateTime('time'))
  const date = getCurrentDateTime('date')

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(getCurrentDateTime('time'))
    }, 1000) // Update time every second to include seconds

    return () => clearInterval(timerId) // Cleanup on component unmount
  }, [])

  const [hoursMinutes, seconds] = time.split(':').reduce(
    (acc, part, index) => {
      if (index < 2) acc[0] += (acc[0] ? ':' : '') + part
      else acc[1] = part
      return acc
    },
    ['', '']
  )

  return (
    <section className="flex size-full flex-col gap-10 mx-10">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 md:p-11">
          <h2 className="glassmorphic-bg max-w-[310px]">Último chat: 19/06/24 às 12:30</h2>
          <h2 className="glassmorphic-bg max-w-[310px]">Última anotação: 19/06/24 às 12:30</h2>
          <div className="flex flex-col gap-2">
            <h1 className={cn('h1 lg:text-7xl font-extrabold flex items-end', fontMono.variable)}>
              <span>{hoursMinutes}</span>
              <span className="text-lg align-bottom m-2">
                <span className="mr-1">:</span>
                {seconds}
              </span>
            </h1>
            <p className="text-lg font-medium text-sky-200 lg:pl-2">{date}</p>
          </div>
        </div>
      </div>

      <AppOptionsSection />
    </section>
  )
}

export default Home
