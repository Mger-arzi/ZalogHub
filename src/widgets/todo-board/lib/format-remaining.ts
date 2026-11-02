export function formatRemaining(total: number, active: number): string {
  if (total === 0) return 'Пока нет задач'
  if (active === 0) return 'Все задачи выполнены'

  const mod10 = active % 10
  const mod100 = active % 100
  if (mod10 === 1 && mod100 !== 11) return `Осталась ${active} задача`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `Осталось ${active} задачи`
  }
  return `Осталось ${active} задач`
}
