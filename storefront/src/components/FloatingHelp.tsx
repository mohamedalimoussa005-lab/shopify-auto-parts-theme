import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

export default function FloatingHelp() {
  return (
    <button
      className="fixed bottom-6 right-6 rounded-full bg-primary text-white w-14 h-14 shadow-card hover:bg-primary-600"
      aria-label="Aide et FAQ"
    >
      <QuestionMarkCircleIcon className="w-7 h-7 m-auto" />
    </button>
  )
}

