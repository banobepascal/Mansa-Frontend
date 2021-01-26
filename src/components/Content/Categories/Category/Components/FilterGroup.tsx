import React, {useState} from 'react';
import { Grid, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Input from '../../../../Common/Input';
import CommonStyles from '../../../../Common/CustomStyles';
import { Button } from 'rsuite';
import { Checkbox } from 'rsuite';
import { useStore } from '../../../../../store/useStore';
import { observer } from 'mobx-react';


interface AppProps {
    title: string;
    filters: any[];
    groupType: string;
}

const FilterGroup = (props: AppProps) => {
    const store = useStore();
    const { filterProducts } = store.categoriesStore;
    const { filterSearchProducts } = store.searchStore;
    const {title, filters, groupType} = props;
    const [activeCheckbox, setActiveCheckbox] = useState<string[]>([])
    const [filterItems, setFilterItems] = useState<any[]>([])

    const handleCheckboxChange = (name: string, active: boolean, type: string) => {
        if (active) {
            const newArray = activeCheckbox.filter((filter) => filter !== name)
            const newFilterArray = filterItems.filter((filter) => filter.name !== name)
            setActiveCheckbox(newArray);
            setFilterItems(newFilterArray);
            
            if (groupType === "category") {
                filterProducts(newFilterArray)
            }

            if (groupType === "search") {
                filterSearchProducts(newFilterArray)
            }
            
            return true
        }

        setActiveCheckbox([...activeCheckbox, name]);
        setFilterItems([...filterItems, { name, type }])

        if (groupType === "category") {
            filterProducts([...filterItems, { name, type }]);
        }

        if (groupType === "search") {
            filterSearchProducts([...filterItems, { name, type }])
        }
        
        return true;
    }

    return (
        <div>
            <Grid container direction="column" spacing={4}>
                <Grid item>
                    <Grid container direction="column">
                        <Grid item>
                            <Typography variant="body2" style={{fontWeight: 600, textTransform: "capitalize"}}>
                                {title}
                            </Typography>
                        </Grid>
                    </Grid>    
                </Grid>

                { filters.map((filter, index) => {
                    return (
                        <Grid item style={{borderTop: "1px solid #EBECF0"}} key={index}>
                            <Grid container direction="column" spacing={2}> 
                                <Grid item>
                                    <Typography variant="body2" style={{fontWeight: 600}}>{filter.title}</Typography>
                                </Grid>

                                <Grid item>
                                    { filter.filters.map((filterChild: any, index: number) => {
                                        if (filter.type === "ratings") {
                                            return (
                                                <Grid container direction="column" key={index}>
                                                    <Checkbox
                                                        checked={activeCheckbox.includes(filterChild.name)}
                                                        onChange={() => handleCheckboxChange(filterChild.name, activeCheckbox.includes(filterChild.name), filter.type)}>
                                                        <Rating
                                                            name="read-only" 
                                                            value={filterChild.name} 
                                                            readOnly
                                                            size="small"
                                                        />
                                                    </Checkbox>
                                                </Grid>
                                            )
                                        }

                                        return (
                                            <Checkbox 
                                                checked={activeCheckbox.includes(filterChild.name)} 
                                                key={index}
                                                onChange={() => handleCheckboxChange(filterChild.name, activeCheckbox.includes(filterChild.name), filter.type)}>
                                                {filterChild.name}
                                            </Checkbox>
                                        )
                                    }) } 
                                </Grid>

                                { filter.type === "price" ? <Grid item>
                                    <Grid container direction="row" spacing={1}>
                                        <Grid item xs={4}>
                                            <Input placeHolder="Min" />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Input placeHolder="Max" />
                                        </Grid>

                                        <Grid item xs={4}> 
                                            <Button className={CommonStyles().btnTransparentBlue}>Go</Button>
                                        </Grid>
                                    </Grid>
                                </Grid> : null }

                            </Grid>
                        </Grid>
                    )
                }) }
            </Grid>
        </div>
    )
}

export default observer(FilterGroup)
