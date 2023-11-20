import createTheme from "@material-ui/core/styles/createTheme";

export const sbTheme = createTheme({
    breakpoints: {
        values: {
            xs: 300,
            sm: 450,
            md: 600,
        },
    },
    zIndex: {
        appBar: 100,
        backDrop: 200,
    }
});