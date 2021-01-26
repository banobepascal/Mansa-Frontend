import React, {useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import FilterTopBar from '../../Common/FilterTopBar';
import ProductContainer from '../../Common/Product/ProductContainer';
import { observer } from 'mobx-react';
import { Loader } from 'rsuite';
import CommonStyles from '../../Common/CustomStyles';
import SlideShow from '../Homepage/Components/SlideShow';


interface AppProps {
    window?(): any;
    openSignin(value: string): void;
}

const Reseller = (props: AppProps) => {
    const classes = useStyles();
    const commonClass = CommonStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
  

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <Grid className={classes.slideShow}>
                <div className={classes.imageContainer}/>
            </Grid>

            <Grid container direction="column" spacing={2} style={{marginTop: 30}}>
                <Grid item>
                    <Typography variant="h4" style={{fontWeight: 600}}>Seller</Typography>
                </Grid>

                <Grid item>
                    <FilterTopBar toggler={handleDrawerToggle} query="Seller" productCount={0}/>
                </Grid>

            <Grid item>
                <Grid container direction="row" spacing={4} className={classes.products}>
                    {/* { favoriteProducts.map((product, index) => {
                        return (
                            <Grid item xs={3} key={index}>
                                <Grid>
                                    <ProductContainer 
                                        product={product}
                                    />
                                </Grid>   
                            </Grid>
                        )
                    }) } */}
                </Grid>      
            </Grid>
            
                <Grid item style={{marginBottom: 20, marginTop: 40}}>
                    <Grid container direction="row" justify="center">
                        <Pagination count={10} variant="outlined" color="primary" className={classes.pagination} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        // padding: 40
    },

    slideShow: {
        height: 350,

        [theme.breakpoints.up(2000)]: {
            height: 450,
        },
        [theme.breakpoints.down(600)]: {
            height: 300,
        },
    },

    imageContainer: {
        padding: 60,
        backgroundImage: "url('https://i.ebayimg.com/images/g/dpoAAOSwkBtejeOc/s-l960.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        display: "flex",
        alignItems: "center",
        
        [theme.breakpoints.down(760)]: {
            width: "100%",
            padding: 40,
        },

        [theme.breakpoints.down(500)]: {
            padding: 20,
        }
    },

    products: {
        // display: "grid",
        // gridTemplateColumns: "repeat(4, 1fr)",
        [theme.breakpoints.down(768)]: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridGap: 26,
            padding: 16,
		
            "& .MuiGrid-item": {
                minWidth: "100%",
                padding: 0
            }
        },
        
         [theme.breakpoints.down(450)]: {
         gridGap: 16
         }
    },

    filterStyles: {
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
    pagination: {
        color: "",
        '& .MuiPaginationItem-outlined': {
            border: "1px solid #15141b",
            '&:hover': {
              color: "#fff",
              backgroundColor: "#15141b"
          }
        },
  
        '& .MuiPaginationItem-outlinedPrimary.Mui-selected': {
          backgroundColor: "#15141b",
          color: "#fff"
        }
      },
}));
export default observer(Reseller)
