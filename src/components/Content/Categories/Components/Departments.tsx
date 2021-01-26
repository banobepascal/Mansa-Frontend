import React from 'react';
import { Grid, Typography, Link } from '@material-ui/core';
import { observer } from 'mobx-react';
// import { categories, Category } from '../../../../data/category';
import { useStore } from '../../../../store/useStore';


const Departments = () => {
    const category = useStore();
    const {categories} = category.categoriesStore;

    return (
        <div>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h6" style={{fontWeight: 600}}>Departments</Typography>
                </Grid>

                <Grid item>
                    { categories.map((category) => {
                        return(
                        <div>
                            <Typography variant="body2" style={{color: "#454F5B", textTransform: "capitalize"}}>
                                <Link href={`/category/type/${category.id}`}  style={{color: "inherit"}}>{category.title}</Link>
                            </Typography>
                        </div>
                    )}) }
                </Grid>
            </Grid>
        </div>
    )
}

export default observer(Departments)
