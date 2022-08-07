import { Box, Grid, Typography, styled, Button } from '@mui/material';
import { useSelector } from 'react-redux';

// components
import CartItem from './CartItem';
import TotalBalance from './TotalBalance';
import EmptyCart from './EmptyCart';
import { payUsingPaytm } from '../../service/api';
import { post } from '../../utils/paytm';

const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0'
    }
}));

const Header = styled(Box)`
  padding: 15px 24px;e
  background: #fff;
`;

const ButtonWrapper = styled(Box) `
   padding: 16px 22px;
   background: #fff;
   box-shadow: 0 -2px 10px rgb(0 0 0 / 10%);
   border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button) `
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    width: 250px;
    height: 51px;
    border-radius: 2px;
`

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('md')]: {
        marginBottom: 15
    }
}));

const buyNow =  async() => {
  let response = await payUsingPaytm({ amount: 500, email: 'nabakumarsit2002@gmail.com' });
  let information = {
    action: 'https://securegw-stage.paytm.in/order/process',
    params: response
  }
  post(information);
}

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <>
      {cartItems.length ? (
        <Component container>
          <LeftComponent item lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography>My Cart ({cartItems.length})</Typography>
            </Header>
            {cartItems.map((item) => (
              <CartItem item={item} />
            ))}
            <ButtonWrapper>
            <Box>
              <StyledButton onClick={()=>buyNow()}>Place Order</StyledButton>
            </Box>
            </ButtonWrapper>
          </LeftComponent>

          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalBalance cartItems={cartItems}/>
          </Grid>
        </Component>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;
