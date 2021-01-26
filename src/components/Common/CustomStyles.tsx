import { makeStyles, Theme } from '@material-ui/core/styles';

const CommonStyles = makeStyles((theme: Theme) => ({
    btnTransparentBlack: {
        border: "1px solid #15141b",
        background: "transparent",
        borderRadius: 6,
        color: "#15141b",
        '&:hover': {
            color: "#fff",
            border: "1px solid #15141b",
            background: "#15141b",
        
        }
    },

    btnTransparentBlue: {
        border: "1px solid #0052CC",
        background: "transparent",
        borderRadius: 6,
        color: "#0052CC",
        '&:hover': {
            color: "#fff",
            border: "1px solid #0052CC",
            background: "#0052CC",
        }
    },

    // transparentBtn: {
    //     border: "1px solid #0052CC",
    //     backgroundColor: "transparent",
    //     width: "100%"
    // },

    btnBlack: {
        border: "1px solid #15141b",
        background: "#15141b",
        borderRadius: 6,
        color: "#fff",
        '&:hover': {
            color: "#fff",
            border: "1px solid #15141b",
            background: "#15141b",
        }
    },

    btnBlue: {
        background: "#0052CC",
        borderRadius: 6,
        color: "#fff",
        '&:hover': {
            color: "#fff",
            background: "#0052CC",
        }
    },

    hoverText: {
        '&:hover': {
            color: "#0052CC"
          }
    },

    mobileBtnClass: {
        display: "none",
        [theme.breakpoints.down(900)]: {
            display: "flex"
        }
    },

    mobileContainer: {
        [theme.breakpoints.down(520)]: {
            flexDirection: "column",

            "& .MuiGrid-item": {
                minWidth: "100%"
            }
        },
    },

    drawerPadding: {
        padding: "1rem 36px",
    },

    drawerPaper: {
        width: 365,
        border: "none",
        backgroundColor: '#fff',
    },

    drawer: {
        display: 'none', 
        [theme.breakpoints.up('sm')]: {
            width: 240,
            flexShrink: 0, 
        },
        [theme.breakpoints.down('md')]: {  
            display: 'none', 
        }
    },

    cartBtn: {
        border: "1px solid #15141b",
        backgroundColor: "transparent",
        boxShadow: "none",
        borderRadius: 6,
        fontSize: 13,
        color: "#15141b",
        '&:hover': {
            color: "#fff",
            border: "1px solid #15141b",
            backgroundColor: "#15141b",
        },

    },

    cartBtnClicked: {
        border: "1px solid #15141b",
        backgroundColor: "#15141b",
        boxShadow: "none",
        borderRadius: 6,
        fontSize: 13,
        color: "#fff",
        '&:hover': {
            color: "#15141b",
            border: "1px solid #15141b",
            backgroundColor: "transparent",
        },
    },

    products: {
        marginTop: 30,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridRowGap: 34,
        gridColumnGap: 24,

        "& .MuiGrid-item": {
            minWidth: "100%"
        },

        [theme.breakpoints.up(2000)]: {
            gridTemplateColumns: "repeat(5, 1fr)",
            gridGap: 54,
        },
        
        [theme.breakpoints.down(1024)]: {
            gridColumnGap: 24,
        },

        [theme.breakpoints.down(768)]: {
            gridTemplateColumns: "repeat(2, 1fr)",
        },

    },

    productsTwo: {
        marginTop: 30,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridRowGap: 34,
        gridColumnGap: 24,

        "& .MuiGrid-item": {
            minWidth: "100%"
        },

        [theme.breakpoints.up(2000)]: {
            gridTemplateColumns: "repeat(6, 1fr)",
            gridGap: 54,
        },

        [theme.breakpoints.down(1999)]: {
            gridTemplateColumns: "repeat(4, 1fr)",
        },

        [theme.breakpoints.down(1080)]: {
            gridTemplateColumns: "repeat(3, 1fr)",
        },
        
        [theme.breakpoints.down(1024)]: {
            gridColumnGap: 24,
        },

        [theme.breakpoints.down(768)]: {
            gridTemplateColumns: "repeat(2, 1fr)",
        },

        [theme.breakpoints.down(500)]: {
            gridColumnGap: 16,
        },

    },

    inputContainer: {
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down(500)]: {
            flexDirection: "column",
            "& .MuiGrid-item": {
                minWidth: "100%"
            }
        }
    },

}));

export default CommonStyles;
