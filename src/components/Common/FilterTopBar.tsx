import React, { SyntheticEvent, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Input from './Input';
import { Apps, Dehaze, Menu } from '@material-ui/icons';
import { observer } from 'mobx-react';
import { useStore } from '../../store/useStore';
import { Dropdown } from 'rsuite';


interface AppProps {
    type?: any;
    toggler?(): void;
    productCount?: number;
    query?: string;
}

const FilterTopBar = (props: AppProps) => {
    const classes = useStyles();
    const store = useStore();
    const [filter, setFilter] = useState<string>("None");
    const { type, toggler, productCount, query } = props;
    const { sortFilters } = store.categoriesStore;
    const { sortSearchFilters } = store.searchStore

    const selectFilter = (eventKey: any, event: SyntheticEvent<any>) => {
        setFilter(eventKey);
        if (type === "category") {
            sortFilters(eventKey);
        }

        if (type === "search") {
            sortSearchFilters(eventKey)
        }
    }

    if (type === "shoplist"){
        return (
            <div className={classes.root}>
                <Grid container direction="row" alignItems="center" style={{padding: "5px"}} className={classes.filterSort} spacing={2}>
                    <Grid item xs>
                        <Grid container direction="row" alignItems="center" spacing={1}>
                            <Grid item container spacing={2} alignItems="center">
                                <Grid item>
                                    <Apps fontSize="small" />
                                </Grid>

                                <Grid item>
                                    <Dehaze fontSize="small" />
                                </Grid>

                                <Grid item className={classes.filterSearch}>
                                    <Input placeHolder="Search this list" />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item >
                        <Grid container direction="row" alignItems="center" spacing={2} >
                            <Grid item>
                                <Typography variant="body2">Filter & Sort</Typography>
                            </Grid>

                            <Grid item className={classes.filterSearch}>
                                <Dropdown 
                                        activeKey={filter}
                                        title={filter}
                                        // className={classes.dropDown}
                                        onSelect={(eventKey: any, event: any) => selectFilter(eventKey, event)}>
                                        { [
                                            {name: "Price: Low to High", id: "priceLowToHigh"},
                                            {name: "Price: High to Low", id: "priceHighToLow"},
                                            {name: "Average rating", id: "averageRating"},
                                            {name: "None", id: "none"},
                                        ].map((value, index) => {
                                            return <Dropdown.Item key={index} active={filter === value.id ? true : false} eventKey={value.name}>{value.name}</Dropdown.Item>
                                        }) }  
                                </Dropdown>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div> 
        )
    }

    return (
        <div className={classes.root}>
            <Grid container direction="row" alignItems="center" style={{padding: "5px"}}>
                <Grid item xs className={classes.filterBtn}>
                    <Grid container direction="row" alignItems="center" spacing={2}>
                        <Grid item>
                            <Menu onClick={toggler}/>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" onClick={toggler}>
                                Filter
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs className={classes.filterText}>
                    <Typography variant="body2">
                        Over {productCount} results for    
                        <span style={{color: "#FF5630", fontWeight: 600, textTransform: "capitalize"}}> {query ? query : "Products"}</span>
                    </Typography>
                </Grid>

                <Grid item>
                    <Grid container direction="row" alignItems="center" spacing={2}>
                        <Grid item>
                            <Typography variant="body2">Sort by</Typography>
                        </Grid>

                        <Grid item>
                                <Dropdown 
                                    activeKey={filter}
                                    title={filter}
                                    className={classes.dropDown}
                                    onSelect={(eventKey: any, event: any) => selectFilter(eventKey, event)}>
                                    { [
                                        {name: "Price: Low to High", id: "priceLowToHigh"},
                                        {name: "Price: High to Low", id: "priceHighToLow"},
                                        {name: "Average rating", id: "averageRating"},
                                        {name: "None", id: "none"},
                                    ].map((value, index) => {
                                        return <Dropdown.Item key={index} active={filter === value.id ? true : false} eventKey={value.name}>{value.name}</Dropdown.Item>
                                    }) }  
                                </Dropdown>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
      boxShadow: "0 0 10px #ddd"
    },

    filterSort: {
        [theme.breakpoints.down(600)]: {
            flexDirection: "column",
            alignItems: "unset",
        }
    },

    filterSearch: {
        [theme.breakpoints.down(600)]: {
           flexGrow: 1
        }
    },

    filterBtn: {
        display: "none",
        [theme.breakpoints.down('sm')]: {
          display: "flex"
        }
    },

    filterText: {
        [theme.breakpoints.down('sm')]: {
           display: "none"
        }
    },

    dropDown: {
        border: "1px solid #EBECF0",
        borderRadius: 0,
        '&:hover': {
            borderRadius: 0,
            backgroundColor: "transparent"
        },

        '&:focus': {
            borderRadius: 0,
            backgroundColor: "transparent"
        }
    }
}));

export default observer(FilterTopBar)
