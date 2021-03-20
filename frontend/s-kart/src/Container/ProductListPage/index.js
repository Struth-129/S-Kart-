import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../actions';
import Layout from '../../Components/Layout';
import { generatePublicUrl } from '../../urlConfig';
import './style.css';
const ProductListPage = (props) => {
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();
    const [priceRange,setPriceRange] = useState({
        under5k: 5000,
        under10k:10000,
        under15k:15000,
        under20k:20000,
        under30k:30000
    });
    useEffect(() => {
        // console.log(props)
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, [])

    return (
        <Layout>{
            Object.keys(product.productsByPrice).map((key, index) => {
                return (
                    <div className="card">
                        <div className="cardHeader">
                            <div>
                                {props.match.params.slug} Mobiles under {priceRange[key]}</div>
                            <button>View All</button>
                        </div>
                        <div style={{ display: 'flex' }}>
                            {
                                product.productsByPrice[key].map(product =>
                                    <div className="productContainer">
                                        <div className="productImgContainer">
                                            {(product.productPictures[0].img!=undefined)?
                                            <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />:null}
                                        </div>
                                        <div className="productInfo">
                                            <div style={{ margin: '5px 0' }}>
                                                {product.name}
                                            </div>
                                            <div>
                                                <span className="rating">4.8⭐</span>&nbsp;
                                        <span>3232</span>
                                            </div>
                                            <div className="productprice">{product.price}</div>
                                        </div>
                                    </div>)
                            }

                        </div>

                    </div>
                )
            })
        }
            {/* <div className="card">
                <div className="cardHeader">
                    <div>
                        Samsung Mobiles under 10k</div>
                    <button>View All</button>
                </div>
                <div>
                    <div className="productContainer">
                        <div className="productImgContainer">
                            <img src="http://localhost:8000/public/6pwYdxZgF--hcbi-1.PNG" alt="" />
                        </div>
                        <div className="productInfo">
                            <div style={{ margin: '5px 0' }}>
                                Samsung 4gb Phone
                                    </div>
                            <div>
                                <span>4.8</span>&nbsp;
                                        <span>3232</span>
                            </div>
                            <div className="productprice"> 5000</div>
                        </div>
                    </div>
                </div>

            </div> */}
        </Layout>
    );
}

export default ProductListPage;