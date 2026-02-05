'use client';

import Link from 'next/link';
import { ReactNode, useState, MouseEventHandler, CSSProperties } from 'react';

interface SecondaryButtonProps {
    href: string;
    children: ReactNode;
    external?: boolean;
    className?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    style?: CSSProperties;
    hoverBackground?: string;
    accentColor?: string;
    accentHoverColor?: string;
    accentOffset?: number;
}

function CornerAccents({
    color = '#A0A0A0',
    offsetOverride,
}: {
    color?: string;
    offsetOverride?: number;
}) {
    const size = 4;
    const thickness = 1;
    const offset = offsetOverride ?? -(size / 2); // Half inside, half outside the button edge

    const cornerStyle = {
        position: 'absolute' as const,
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: 'none' as const,
    };

    return (
        <>
            {/* Top-left corner */}
            <span
                style={{
                    ...cornerStyle,
                    top: `${offset}px`,
                    left: `${offset}px`,
                    borderTop: `${thickness}px solid ${color}`,
                    borderLeft: `${thickness}px solid ${color}`,
                }}
            />
            {/* Top-right corner */}
            <span
                style={{
                    ...cornerStyle,
                    top: `${offset}px`,
                    right: `${offset}px`,
                    borderTop: `${thickness}px solid ${color}`,
                    borderRight: `${thickness}px solid ${color}`,
                }}
            />
            {/* Bottom-left corner */}
            <span
                style={{
                    ...cornerStyle,
                    bottom: `${offset}px`,
                    left: `${offset}px`,
                    borderBottom: `${thickness}px solid ${color}`,
                    borderLeft: `${thickness}px solid ${color}`,
                }}
            />
            {/* Bottom-right corner */}
            <span
                style={{
                    ...cornerStyle,
                    bottom: `${offset}px`,
                    right: `${offset}px`,
                    borderBottom: `${thickness}px solid ${color}`,
                    borderRight: `${thickness}px solid ${color}`,
                }}
            />
        </>
    );
}

export default function SecondaryButton({
    href,
    children,
    external = false,
    className = '',
    onClick,
    style,
    hoverBackground,
    accentColor,
    accentHoverColor,
    accentOffset,
}: SecondaryButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    const baseClasses = `
        relative inline-flex items-center justify-center gap-1
        px-[14px] py-[7px]
        text-gray-900 text-sm font-medium tracking-wider uppercase font-mono
        transition-all duration-200
        ${className}
    `.trim();

    const buttonStyle: CSSProperties = {
        ...style,
        background: isHovered
            ? hoverBackground ?? style?.background ?? 'transparent'
            : style?.background ?? 'transparent',
        border: style?.border ?? '1px solid #E0E0E0',
    };

    const linkProps = {
        className: baseClasses,
        style: buttonStyle,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onClick,
    };

    if (external) {
        return (
            <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                {...linkProps}
            >
                <CornerAccents
                    color={isHovered ? accentHoverColor ?? '#616161' : accentColor ?? '#757575'}
                    offsetOverride={accentOffset}
                />
                {children}
            </Link>
        );
    }

    return (
        <Link href={href} {...linkProps}>
            <CornerAccents
                color={isHovered ? accentHoverColor ?? '#616161' : accentColor ?? '#757575'}
                offsetOverride={accentOffset}
            />
            {children}
        </Link>
    );
}
