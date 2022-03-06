export interface MainThemeInterface {
    dimensions: {
        padding: {
            container: string;
            default: string;
            square: string;
            withBorder: string;
        };
    };
    colors: {
        text: string;
        subtext: string;
        background: string;
        video_bg: string;
        primary: string;
        secondary: string;
        tertiary: string;
        hyperlink: string;
        stroke: string;
        shade: string;
        bubble: string;
        input: string;
    };
    status: {
        unresolved: string;
        student: string;
        professor: string;
    },
    font: {
        family: string;
        lineHeight: number | string;
        size: {
            default: number | string;
            small: number | string;
            h1: number | string;
            h2: number | string;
            h3: number | string;
            h4: number | string;
            h5: number | string;
            h6: number | string;
        }
    }
}

export const MainTheme: MainThemeInterface = {
    dimensions: {
        padding: {
            container: '16px',
            default: '12px 20px',
            square: '12px',
            withBorder: '10.5px 18.5px',
        },
    },
    colors: {
        text: '#000000',
        subtext: '3F4A3C',
        video_bg: '#2F4858',
        background: '#ECEBE2',
        primary: '#7EFF73',
        secondary: '#00E899',
        tertiary: '#00CCBC',
        hyperlink: '#00A2B8',
        stroke: '#ADADAD',
        shade: '#C2C9BE',
        bubble: '#C4C4C4',
        input: '#FFFFFF',
    },
    status: {
        unresolved: '#B90303',
        student: '#32B903',
        professor: '#03B5DC',
    },
    font: {
        family: '"Quicksand", sans-serif',
        lineHeight: 1.6,
        size: {
            default: '1rem',
            small: '0.85rem',
            h1: '2rem',
            h2: '1.75rem',
            h3: '1.55rem',
            h4: '1.4rem',
            h5: '1.3rem',
            h6: '1.2rem',
        },
    },
}