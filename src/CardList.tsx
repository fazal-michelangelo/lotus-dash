import './App.css';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { CardStoreImpl } from './CardStore';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Grid from '@material-ui/core/Grid';

import Spin from './Spinner-1s-200px.gif';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 40,
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));


interface CardListProps {
    todoStore: CardStoreImpl
};

export const CardList: React.FC<CardListProps> = observer(({ todoStore }) => {

    const classes = useStyles();

    useEffect(() => {
        todoStore.fetchList()
    }, [todoStore]);


    if (todoStore.loading) {
        return <div className="loader">
            <img src={Spin} alt="loader" />
        </div>
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <GridList cellHeight={220} cols={3}>
                        {todoStore.result.map((tile, i) => (
                            <GridListTile key={i}>
                                <img src={tile.gravatar} alt={tile.gravatar} />
                                <GridListTileBar
                                    title={tile.organizations[0]}
                                    subtitle={
                                        <>
                                            <span>Followers: {tile.followers}</span> <br />
                                            <span>Contributions: {tile.contributions}</span>
                                        </>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </Grid>
            </Grid>
        </div>
    )
});