import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Badge, Link, Theme} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CustomButton from '../CustomButton';
import { ShoppingCart, Search, MoreVert } from '@material-ui/icons';
import { accountBtnDBDNavbar } from '../../../data/category';
import { Popover, Whisper, Button, Icon } from 'rsuite';
import { Input, InputGroup } from 'rsuite';
import {useStore} from '../../../store/useStore';
import { observer } from 'mobx-react';
import {ReactComponent as MansaLogo} from "../../../assets/images/Mansa-final.svg"
import { getCookie } from '../../../Utitlities/cookies';
import { RouteComponentProps, withRouter } from 'react-router-dom';


interface AppProps extends RouteComponentProps {
  toggler(): void;
  toggleAccounts(): void;
  openSignin(value: string): void;
}

const AccountsLists = (
	<Popover>
	<Grid container direction="column" spacing={1}>
		{accountBtnDBDNavbar.map((setting, index) => {
		return (
			<Grid item>
			<Typography variant="body2" className="hoverTxtPopover">
				<Link style={{textDecoration: "none", color: "inherit"}} href={setting.link}>{setting.setting}</Link>
			</Typography>
			</Grid>
		)
		})}
	</Grid>
	</Popover>
);


const NavBar = (props: AppProps) => {
		const store = useStore();
		const classes = useStyles();
		const [city, setCity] = useState("");
		const [search, setSearch] = useState<string>("")
		const {toggler, toggleAccounts, openSignin} = props;
		const {signOut} = store.authStore;
		const {itemsToCart, getItemsInCart} = store.cartStore;
		const {showCategories, categories} = store.categoriesStore;
		const {user, setUser, loggedIn} = store.authStore;

		useEffect(() => {
			const userDetails = getCookie('user_details');
			if (userDetails) {
				setUser(JSON.parse(userDetails))
			}
		}, [setUser]);
	 
		useEffect(() => {
			showCategories();
		}, [showCategories]);

		useEffect(() => {
			getItemsInCart()
		}, [getItemsInCart]);

		useEffect(() => {
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(async (position) => {
					try {
						const LAT = position.coords.latitude;
						const LNG = position.coords.longitude;
						const response = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.3d7c17796d5b1427e77142be16925f81&format=json&lat=${LAT}&lon=${LNG}`);
						const result = await response.json();
						setCity(result.address.city);
					} catch (error) {
						return error
					}
				})
			}
			
		}, []);

		const handleSearch = (value: string) => {
			setSearch(value);
		} 

		const querySearch = () => {
			if (!search || search !== "") {
				window.location.href =  window.location.origin + `/search?q=${search}`;
			}
			return false;
		} 

		return (
		<div className={classes.grow}>
			<Grid container direction="column" style={{width: "100%"}}>
				<Grid item className={classes.mainNavbar}>
					<Grid container direction="row" alignItems="center" style={{width: "100%"}}> 
						<Grid item xs style={{width: "100%"}}>
							<Grid container direction="row" alignItems="center" spacing={2} style={{flexWrap: "nowrap"}} className={classes.searchMenNavbar}>  
								<Grid item className={classes.menuContainerRoot}>
									<Grid container direction="row" alignItems="center" className={classes.menuContainer}>
										<Grid item>
											<IconButton onClick={toggler} className={classes.menuButton} color="inherit" aria-label="menu">
												<MenuIcon />
											</IconButton>
										</Grid>

										<Grid item>
											<Typography variant="h6" className={classes.title}>
												<Link href="/" style={{color: "inherit", cursor: "pointer", textDecoration: "none"}}>Mansa</Link>      
											</Typography>
										</Grid>
									</Grid>
								</Grid>

								<Grid item  className={classes.searchRoot}>
									<InputGroup style={{border: "none"}}>
										<Input placeholder="Search here..." onChange={handleSearch} onPressEnter={querySearch} />
										<InputGroup.Button onClick={querySearch}  style={{borderBottomRightRadius: 4, borderTopRightRadius: 4, backgroundColor: "#e0e0e0"}}>
											<Search  />
										</InputGroup.Button>
									</InputGroup>	  
								</Grid>    
							</Grid>
						</Grid>
						
						<Grid item className={classes.cartAllBtn}>
							<Grid container direction="row" spacing={2} alignItems="center" justify="flex-end" style={{flexWrap: "nowrap"}}>
								{ loggedIn === true || user.uid ? 
									<Grid item className={classes.accountsListsBtn}>
										<CustomButton text="Log out" handleClick={signOut} classes={classes.navbarBtnDesign} />
									</Grid>
								:
									<Grid item className={classes.accountsListsBtn}>
										<CustomButton text="Login/Signup" handleClick={() => openSignin("login")} classes={classes.navbarBtnDesign} />
									</Grid>
								}

								<Grid item className={classes.accountsListsBtn}>
									<Whisper placement="bottom" trigger="hover"  speaker={AccountsLists} enterable>
										<Button className={classes.navbarBtnDesign}>
											Accounts & Lists{' '}<Icon icon='angle-down' />
										</Button>
									</Whisper>
								</Grid>
								<Grid item style={{paddingRight: 0 }}>
									<IconButton aria-label="show 11 new notifications" color="inherit" href="/cart">
										<Badge badgeContent={itemsToCart.length} color="secondary">
											<ShoppingCart style={{color: "#fff"}} />
										</Badge>
									</IconButton>
								</Grid>

								<Grid item style={{paddingRight: 0}} className={classes.signinMobile}>
								<IconButton onClick={toggleAccounts}>
										<MoreVert style={{color: "#fff"}} />
									</IconButton>
								</Grid>
							</Grid>
						</Grid>
					
					</Grid>
				</Grid>
				<Grid item className={classes.mobileSearchBar}>
					<InputGroup style={{border: "none"}}>
						<Input style={{borderBottomLeftRadius: 4, borderTopLeftRadius: 4}} />
						<InputGroup.Button style={{borderBottomRightRadius: 4,
							borderTopRightRadius: 4, backgroundColor: "#e0e0e0"}}>
						 <Search/>
					</InputGroup.Button>
				</InputGroup>

				</Grid>
				<Grid item className={classes.subMainNavbar}>
					<Grid container direction="row" alignItems="center" className={classes.subMainNavbarRow} xs={12}>
						<Grid item container direction="row" spacing={2} xs={1} wrap="nowrap" alignItems="center" style={{paddingLeft: 20}}>
							<Grid item>
								<Icon icon="map-marker" style={{color: "#fff"}} />
							</Grid>
							<Grid item style={{display: "flex", alignItems: "center"}}>
								<Typography variant="body2" style={{color: "#fff"}}>{city ? city : "Unknown"}</Typography>
							</Grid>
						</Grid>

						<Grid item className={classes.subMainNavbarTextCol2}>
							<Grid container direction="row" xs={12} spacing={2} alignItems="center" style={{flexWrap: "nowrap"}}>
								{categories.map((category) => {
									 return (
										<Grid item>
											 <Button href={`/category/type/${category.id}`} className={classes.navbarBtnDesign} style={{border: "none", color: "#8d9091", textTransform: "capitalize"}}>{category.title}</Button>
										</Grid>
									 )
								 })}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

		</div>
	)
}

const useStyles = makeStyles((theme: Theme) => ({
	grow: {
		flexGrow: 1,
		color: "#000",
		width: "100%"
	},

	menuButton: {
		color: "#fff"
	},

	title: {
		color: "#fff"
	},

	mainNavbar: {
		backgroundColor: "#15141b",
		padding: 10,
		width: "100%",

		[theme.breakpoints.down(768)]: {
			padding: "10px 0",
		}
	},

	searchRoot: {
	// marginLeft: 50,
		margin: "0 4rem",
		width: "100%",

		[theme.breakpoints.down(600)]: {
			display: "none"
		}
	},

	searchContainer: {
		height: "40px",
		width: "100%",
		flexWrap: "nowrap",
		marginLeft: "100px",
		[theme.breakpoints.down('md')]: {
			marginLeft: "0px",
		}
	},

	searchRightRadius: {
		borderBottomRightRadius: 2,
		borderTopRightRadius: 2
	},

	searchInput: {
		height: "40px",
		borderRadius: 0,
		backgroundColor: "#fff",
		width: "50ch",
		[theme.breakpoints.down('md')]: {
			width: "100%"
		}
	},

	searchBtn: {
		border: "1px solid #fff",
		borderRadius: "0px 4px 4px 0px",
		height: "40px",
		alignItems: "center",
		textAlign: "center"
	},

	accountsListsBtn: {
		[theme.breakpoints.down('sm')]: {
			display: "none"
		}
	},

	signinMobile: {
		display: "none",
		paddingLeft: 0,
		[theme.breakpoints.down('sm')]: {
			display: "flex",
		}
	},

	cart: {
		[theme.breakpoints.down('sm')]: {
			paddingRight: 0
		}
	},

	languageBtn: {
		[theme.breakpoints.down('sm')]: {
			display: "none"
		}
	},

	navbarBtnDesign: {
		height: "40px",
		border: "1px solid #fff",
		backgroundColor: "transparent",
		boxShadow: "none",
		color: "#fff",
		borderRadius: 6,
		display: "flex",
		alignItems: "center",
		'&:hover': {
			color: "#0052CC",
			border: "1px solid #0052CC",
			backgroundColor: "transparent",
		}
	},

	menuContainer: {
		width: "100%",
		flexWrap: "nowrap",
		[theme.breakpoints.down('md')]: {
		}
	},

	menuContainerRoot: {
		flexWrap: "nowrap",
		// [theme.breakpoints.down('md')]: {
		//   width: "100%"
		// }
	},
	subMainNavbarRow: {
		flexWrap: "nowrap",
		width: "100%",
			// overflow: "visible"
	},

	cartAllBtn: {

	},

	subMainNavbar: {
		width: "100%",
		maxWidth: "100%",
		backgroundColor: "#15141bf6",
		padding: 10,
		// overflow: "scroll",
		overflowX: 'auto',
		[theme.breakpoints.down('md')]: {
			// overflow: "visible"
		}
	},

	searchMenNavbar: {
	// [theme.breakpoints.down('md')]: {
	//   flexDirection: "column"
	// }
	},

	subMainNavbarText: {
		color: "#8d9091",
		width: "100%",
		'&:hover': {
			color: "#0052CC"
		}
	},

	hoverTxt: {
		'&:hover': {
			color: "#0052CC"
		}
	},

	subMainNavbarTextCol2: {
		marginLeft: "75px",
		[theme.breakpoints.down("sm")]: {
			marginLeft: "125px",
		}
	},

	searchBar: {
		[theme.breakpoints.down(768)]: {
			minWidth: "100%"
		}
	},

	mobileSearchBar: {
		backgroundColor: "#15141b",
		padding: "0px 10px 10px",
		display: "none",
		[theme.breakpoints.down(600)]: {
			minWidth: "100%",
			display: "flex"
		}
	},

}));

export default withRouter(observer(NavBar));
