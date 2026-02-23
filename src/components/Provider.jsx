import AuthProvider from '../context/AuthContext'
import StoreContextProvider from '../context/StoreContext'
import OrderContextProvider from '../context/OrderContext'

const Provider = ({ children }) => {
  return (
    <>
      <AuthProvider>
       <StoreContextProvider>
          <OrderContextProvider>
               {children}
          </OrderContextProvider>
        </StoreContextProvider>
      </AuthProvider>
    </>
  )
}

export default Provider