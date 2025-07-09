import { Label } from './ui/label'
import { Input } from './ui/input'

export function InputWithText({ className, value, onChange }) {
  return (
    <div className={`grid w-full max-w-sm items-center gap-1.5 ${className}`}>
      <Label
        htmlFor="board-title"
      >Board Title
        <span className='text-red-400'>*</span>
      </Label>
      <Input
        type="text"
        id="board-title"
        placeholder=""
        required
        value={value}
        onChange={onChange}
        className={'border-black'}
      />
      <p className="text-sm text-muted-foreground">Board title is required</p>
    </div>
  )
}
