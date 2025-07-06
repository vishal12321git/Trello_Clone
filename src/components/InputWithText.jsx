/* eslint-disable max-len */
import { Label } from './ui/label'
import { Input } from './ui/input'

export function InputWithText({ className }) {
  return (
    <div className={`grid w-full max-w-sm items-center gap-1.5 ${className}`}>
      <Label htmlFor="email-2">Board Title<span className='text-red-400'>*</span></Label>
      <Input type="email" id="email-2" placeholder="" required className={'border-black'}/>
      <p className="text-sm text-muted-foreground">Board title is required</p>
    </div>
  )
}
