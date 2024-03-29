import React, { useEffect, useState } from 'react'
import './scss/mouse.scss'
import { Link } from 'react-router-dom'

import axios from 'axios'

export default function Mouse() {
    const ShowUrl = 2;
    const [category, setCategory] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/apis/v1/categories/1')
            .then(response => {
                setCategory(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <section className="section section-ban-phim" id="section_636757238">
            <div className="bg section-bg fill bg-fill bg-loaded" />
            <div className="section-content relative">
                <div className="row" id="row-359545043">
                    <div id="col-1941119099" className="col small-12 large-12">
                        <div className="col-inner">
                            <div className="container section-title-container">
                                <h3 className="section-title section-title-normal">
                                    <b />
                                    <span className="section-title-main">KeyBoard</span>
                                    <b />
                                    <Link to="/KeyBoard" target="">
                                        Xem tất cả
                                        <i className="icon-angle-right" />
                                    </Link>
                                </h3>
                            </div>
                            <div
                                className="row large-columns-5 medium-columns-3 small-columns-2 row-small has-shadow row-box-shadow-1 row-box-shadow-2-hover slider row-slider slider-nav-simple slider-nav-push"
                                data-flickity-options='{"imagesLoaded": true, "groupCells": "100%", "dragThreshold" : 5, "cellAlign": "left","wrapAround": true,"prevNextButtons": true,"percentPosition": true,"pageDots": false, "rightToLeft": false, "autoPlay" : 3000}'
                            >
                                {
                                    category?.data?.map((product, index) => (
                                        <div
                                            className="product-small col has-hover product type-product post-7071 status-publish first instock product_cat-layout-75 product_cat-akko-switch-v3 product_cat-ban-phim product_cat-gasket-mount product_cat-hotswap product_cat-monsgeek product_cat-oem-profile product_cat-pbt-double-shot product_cat-rgb product_cat-south-facing product_tag-ban-phim-monsgeek-m1-qmk-silver-full-nhom-mach-xuoi-qmk-via-rgb-hotswap has-post-thumbnail shipping-taxable purchasable product-type-simple"
                                            key={index}
                                        >
                                            <div className="col-inner">
                                                <div className="badge-container absolute left top z-1" />
                                                <div className="product-small box">
                                                    <div className="box-image">
                                                        <div className="image-fade_in_back">
                                                            <Link to={`/products/${product.id}`} className="col-md-6 col-lg-4 col-xl-3">
                                                                {product?.product_options?.map((option, optionIndex) => (
                                                                    <React.Fragment key={optionIndex}>
                                                                        {option.product_option_pictures && option.product_option_pictures.slice(0, ShowUrl).map((picture, pictureIndex) => (
                                                                            <img
                                                                                key={picture.id}
                                                                                width={247}
                                                                                height={296}
                                                                                src={picture.url}
                                                                                alt=""
                                                                                loading="lazy"
                                                                                className={pictureIndex % 2 === 0 ? "attachment-woocommerce_thumbnail size-woocommerce_thumbnail" : "show-on-hover absolute fill hide-for-small back-image"}
                                                                            />
                                                                        ))}
                                                                    </React.Fragment>
                                                                ))}
                                                            </Link>
                                                        </div>
                                                        <div className="image-tools is-small top right show-on-hover" />
                                                        <div className="image-tools is-small hide-for-small bottom left show-on-hover"></div>
                                                        <div className="image-tools grid-tools text-center hide-for-small bottom hover-slide-in show-on-hover"></div>
                                                    </div>
                                                    <div className="box-text box-text-products">
                                                        <div className="title-wrapper">
                                                            <p className="name product-title woocommerce-loop-product__title">
                                                                <a>
                                                                {product.name}
                                                                </a>
                                                            </p>
                                                        </div>
                                                        <div className="price-wrapper">
                                                            {" "}
                                                            <span className="price">
                                                                <span className="woocommerce-Price-amount amount">
                                                                    <bdi>
                                                                    {product.product_options[0].price}&nbsp;
                                                                        <span className="woocommerce-Price-currencySymbol">
                                                                            ₫
                                                                        </span>
                                                                    </bdi>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n            #section_636757238 {\n                padding-top: 0;\n                padding-bottom: 0\n            }\n        "
                }}
            />
        </section>

    )
}
