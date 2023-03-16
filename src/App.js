import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAddToCart, removeItemFromCart } from './addToCart.slice';

function App() {
  const dispatch = useDispatch();
  const { itemInCart, itemList } = useSelector(state => state.addtocard);

  const handleAddItemToCart = (item) => {
    dispatch(setAddToCart(item))
  }

  const handleDeleteItemToCart = (item) => {
    let list = [...itemInCart];
    let indexToRemove = list.findIndex(obj => obj.id === item.id);
    if (indexToRemove !== -1) {
      list.splice(indexToRemove, 1);
    }
    dispatch(removeItemFromCart(list));
  }

  const subTotal = itemInCart?.reduce((total, item) => total = total + item.cost, 0);

  const transformItemsInACartList = (myArray) => {

    const arrayOfElementsWithoutDublicates = [];

    let itemIdCount = myArray.reduce((accumulator, current) => {
      accumulator[current.id] = (accumulator[current.id] || 0) + 1;
      return accumulator;
    }, {});

    let newArray = myArray.map(obj => {
      if (itemIdCount[obj.id] >= 1) {
        return { ...obj, totalItem: itemIdCount[obj.id] };
      } else {
        return obj;
      }
    });

    newArray.forEach((object) => {
      const isObjectExists = arrayOfElementsWithoutDublicates.some((newObject) => {
        return newObject.id === object.id;
      });

      if (!isObjectExists) {
        arrayOfElementsWithoutDublicates.push(object);
      }
    });

    return arrayOfElementsWithoutDublicates;
  }

  return (
    <div className="container-fluid">
      <div className='row justify-content-between'>
        {/* Pizza List */}
        <div className='col-md-12 col-lg-8'>
          <div className="row">
            {itemList?.map((item, index) => {
              const filteredItem = itemInCart?.filter(filterItem => filterItem.id === item.id);
              return <div key={"cardKey" + item.id} className='col-md-12 col-lg-4'>
                <div className="card my-2">
                  <div className='image-box'>
                    <img src={item.imgSrc} className="card-img-top" alt={item.name} />
                    <b className='text-over-image'>₹ {item.cost}</b>
                  </div>
                  <div className="card-body">
                    <div className="control-text-up-to-one-line">
                      <h5 className="card-title">{item.name}</h5>
                    </div>
                    <div className="control-text-up-to-two-line">
                      <p className="card-text">{item.description}</p>
                    </div>
                    {!filteredItem.length ? <button onClick={() => handleAddItemToCart(item)} className="btn btn-sm btn-warning mt-2">Add To Cart</button>
                      : <div className="btn-group btn-group-sm my-1" role="group" aria-label="Small button group">
                        <button onClick={() => handleDeleteItemToCart(item)} type="button" className="btn btn-outline-danger">-</button>
                        <button type="button" disabled={true} className="btn btn-outline-dark">{filteredItem.length}</button>
                        <button onClick={() => handleAddItemToCart(item)} type="button" className="btn btn-outline-success">+</button>
                      </div>}
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
        {/* Cart Part */}
        <div className="col-md-12 col-lg-3 border m-lg-2">
          <p className="h1">Cart</p>
          <div className='cart-item-box'>
            {transformItemsInACartList(itemInCart)?.map((item, index) => {
              return <div key={"iteminacart" + index} className="my-2 border p-2">
                <div key={"iteminacart" + index} className="d-flex">
                  <div>
                    <img className='media-image' src={item.imgSrc} alt={item.name} />
                  </div>
                  <div className="flex-grow-1 ms-3 control-text-up-to-three-line">
                    <h6 className='m-0'>{item.name}</h6>
                    <small>{item.description}</small>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="btn-group btn-group-sm my-1" role="group" aria-label="Small button group">
                    <button onClick={() => handleDeleteItemToCart(item)} type="button" className="btn btn-outline-danger">-</button>
                    <button type="button" disabled={true} className="btn btn-outline-dark">{item.totalItem || 1}</button>
                    <button onClick={() => handleAddItemToCart(item)} type="button" className="btn btn-outline-success">+</button>
                  </div>
                  <div>
                    <h6>₹ {(item.totalItem || 1) * item.cost}</h6>
                  </div>
                </div>
              </div>
            })}
            {!itemInCart.length &&
              <div className="d-flex justify-content-center">
                <img className='empty-cart-image' src={"https://www.pngfind.com/pngs/m/272-2727925_continue-shopping-empty-cart-png-transparent-png.png"} alt="imageasd" />
              </div>}
          </div>
          {!!itemInCart.length && !!subTotal && <div className="my-2 w-100">
            <div className="d-flex justify-content-between align-items-center">
              <h6>SubTotal</h6>
              <h6>₹ {subTotal}</h6>
            </div>
            <button className='btn btn-lg btn-success w-100'>Check Out</button>
          </div>}
        </div>
      </div>
    </div>);
}

export default App;
