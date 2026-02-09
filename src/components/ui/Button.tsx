import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "relative h-8 inline-flex font-mono items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 uppercase gap-1 leading-[1.2] font-semibold tracking-[-0.04em] tracking-tight [&_svg:not([class*='size-'])]:size-4 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--btn-primary)] text-[var(--btn-primary-text)]',
          'border-2 border-[var(--btn-primary-border)]',
          'shadow-[0px_0px_4px_var(--btn-primary)]/80',
          'hover:bg-[var(--btn-primary-hover)]',
        ],
        outline: [
          'bg-transparent text-[var(--btn-outline-text)] border-[var(--btn-outline-border)] border-1',
          'hover:bg-[var(--btn-outline-hover)]',
        ],
        secondary: [
          'bg-[var(--btn-secondary)] text-[var(--btn-secondary-text)]',
          'border-none',
          'hover:bg-[var(--btn-secondary-hover)]',
        ],
      },
      size: {
        default:
          'h-8 px-2.5 text-sm has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        sm: "h-7 px-2.5 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-10 px-2.5 text-base has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        icon: 'size-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

/* -------------------------------------------------------------------------------------------------
 * Button
 * -----------------------------------------------------------------------------------------------*/

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /**
   * If true, the button will render as a Slot, merging props onto its child element.
   * Useful for rendering links styled as buttons (e.g., with Next.js Link or react-router).
   * @default false
   */
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const cornerColor =
      variant === 'outline'
        ? 'var(--btn-outline-corner)'
        : variant === 'secondary'
          ? 'var(--btn-secondary-corner)'
          : 'var(--btn-primary-corner)'

    return (
      <div className={cn('relative w-fit', className)} data-variant={variant}>
        <Comp className={cn(buttonVariants({ variant, size }))} ref={ref} {...props}>
          {children}
        </Comp>

        <span className="pointer-events-none absolute inset-0" aria-hidden="true">
          <span
            className="absolute top-[-0.5px] left-[-0.5px] size-1 border-t border-l"
            style={{ borderColor: cornerColor }}
          />
          <span
            className="absolute top-[-0.5px] right-[-0.5px] size-1 border-t border-r"
            style={{ borderColor: cornerColor }}
          />
          <span
            className="absolute bottom-[-0.5px] left-[-0.5px] size-1 border-b border-l"
            style={{ borderColor: cornerColor }}
          />
          <span
            className="absolute right-[-0.5px] bottom-[-0.5px] size-1 border-r border-b"
            style={{ borderColor: cornerColor }}
          />
        </span>
      </div>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
