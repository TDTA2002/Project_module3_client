import { useState, useEffect, useRef } from 'react';
import './admin.scss'
import axios from 'axios';
import { randomId } from '@mieuteacher/meomeojs';
import OptionNavigate from './OptionNavigate'
import Update from './Update';
import { Modal } from 'antd';
function App() {
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([
    {
      name: "Name Options",
      price: 1000,
      stock: 10,
      pictures: []
    }
  ]);

  const [optionActive, setOptionActive] = useState(0);

  const urlPreviewRef = useRef();

  const [nameEdit, setNameEdit] = useState("");

  function deleteOptions(index) {

    if (options.length == 1) {
      alert("Phải có ít nhất 1 options")
      return
    }

    let tempOptions = [...options];
    tempOptions = tempOptions.filter((option, indexFilter) => indexFilter != index);
    setOptionActive(index != 0 ? index - 1 : index);
    setOptions(tempOptions)
  }

  function addOptions() {
    setOptions([...options, {
      name: "New Options",
      price: 0,
      stock: 0,
      pictures: []
    }])
  }

  useEffect(() => {
    axios.get("http://localhost:4000/apis/v1/categories")
      .then(res => {
        setCategories(res.data.data)
      })
  }, [])

  let timeOutTarget = null;

  const [products, setProducts] = useState([]);
  try {
    useEffect(() => {
      axios.get("http://localhost:4000/apis/v1/products")
        .then(res => {
          setProducts(res.data.data)

        })
        .catch(err => {
          console.log("err", err)
        })

    }, [])
  } catch (err) {
    // console.log("err", err);
  }
  const [updateData, setUpdateData] = useState(null);

  return (
    <div>
      <a href="/"><h1>Home</h1></a>
      <div className='product-admin-container'>
        <div>
          <div className='products'>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product Image</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => (
                  <tr key={randomId()} className="product">
                    <th scope="row">{index + 1}</th>
                    <td className="product_image"><img src={product.avatar} alt="" /></td>
                    <td>{product.name}</td>
                    <td>{product.product_options[0].price}</td>
                    <td><button onClick={() => {
                      setUpdateData(product);
                    }}>Update</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {updateData ? <Update updateData={updateData} setUpdateData={setUpdateData} categories={categories} /> : <></>}
          </div>
        </div>
        <div className="App">
          <h1>Thêm Sản Phẩm</h1>
          <form onSubmit={(eventForm) => {
            // khử hành vi mặc định của form
            eventForm.preventDefault();
            // khai báo biến product
            let newProduct = {
              category_id: Number(eventForm.target.category_id.value),
              name: eventForm.target.name.value,
              des: eventForm.target.des.value,
              avatar: eventForm.target.avatar.files[0],
              options: options
            }

            let fakeForm = new FormData();
            fakeForm.append("imgs", newProduct.avatar);

            for (let i in newProduct.options) {
              for (let j in newProduct.options[i].pictures) {
                fakeForm.append("imgs", newProduct.options[i].pictures[j].file);
                delete newProduct.options[i].pictures[j]["file"];
              }
            }

            fakeForm.append("product_infor", JSON.stringify(newProduct));

            axios.post("http://localhost:4000/apis/v1/products", fakeForm,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(res => {
                console.log("res", res)
                Modal.success({
                  content: "Add Thành Công",
                  onOk: () => {
                    window.location.href = "/";
                  },
                });
              })
              .catch(err => {
                console.log("err", err)
              })


          }} className="product_form">

            <div style={{ display: "flex" }}>
              <div>
                <div className='product_form_name'>
                  Product Name
                  <input name='name' type="text" />
                </div>
                <div className='product_form_des'>
                  Product Des
                  <textarea name="des" id="" cols="30" rows="10"></textarea>
                </div>
                <div className='product_form_avatar'>
                  Product Avatar
                  <input name="avatar" onChange={(event) => {
                    if (event.target.files.length == 0) {
                      console.log("Chưa chọn hình!")
                    } else {
                      //console.log("event", event.target.files)
                      let blodUrl = URL.createObjectURL(event.target.files[0])
                      //console.log("urlPreviewRef", urlPreviewRef.current)
                      urlPreviewRef.current.src = blodUrl;
                      /// document.getElementById('testimg').src = blodUrl;
                    }
                  }} type="file" />
                  <img ref={urlPreviewRef} id='testimg' style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                    src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930" />
                </div>
                <div className='options'>
                  {/* Điều Hướng */}
                  <OptionNavigate addOptions={addOptions} deleteOptions={deleteOptions} setNameEdit={setNameEdit} optionActive={optionActive} setOptionActive={setOptionActive} options={options} />
                  {/* Nội Dung Options */}
                </div>

                <div key={randomId()} className='options_box'>
                </div>
                <form className='option_form'>
                  <div>
                    Price:
                    <input onChange={(e) => {
                      clearTimeout(timeOutTarget);

                      timeOutTarget = setTimeout(() => {

                        let tempOptions = [...options];
                        tempOptions[optionActive].price = e.target.value;
                        setOptions(tempOptions)

                      }, 500)
                    }} defaultValue={options[optionActive].price} name='price' type="text" />
                  </div>
                  {/* <div>
                    Stock:
                    <input onChange={(e) => {
                      clearTimeout(timeOutTarget);

                      timeOutTarget = setTimeout(() => {

                        let tempOptions = [...options];
                        tempOptions[optionActive].stock = e.target.value;
                        setOptions(tempOptions)

                      }, 500)
                    }} defaultValue={options[optionActive].stock} name='stock' type="text" />
                  </div> */}
                  <div>
                    Pictures:
                    <input onChange={(e) => {
                      let pictureList = [...options[optionActive].pictures];
                      for (let i in e.target.files) {
                        if (i == "length") {
                          break;
                        }
                        pictureList.push(
                          {
                            url: URL.createObjectURL(e.target.files[i]),
                            file: e.target.files[i]
                          }
                        )
                      }
                      let updateOptions = [...options];
                      updateOptions[optionActive].pictures = pictureList;
                      setOptions(updateOptions);
                    }} type="file" multiple />
                  </div>
                </form>
                <div className='option_pictures'>
                  {
                    options[optionActive].pictures.map((img, index) =>
                      <div className='img_item'>
                        <img key={randomId()} src={img.url}
                          style={{ width: "100px", height: "100px", borderRadius: "50%", margin: "0 5px" }} />
                        <p onClick={() => {
                          if (window.confirm("Xóa ok?")) {
                            let tempOptions = [...options];
                            tempOptions[optionActive].pictures =
                              tempOptions[optionActive].pictures.filter((picture, indexMap) => indexMap != index);
                            setOptions(tempOptions);
                          }
                        }} className='img_item_delete_icon'>X</p>
                      </div>
                    )
                  }
                </div>
                <div className='product_form_category'>
                  <select name='category_id'>
                    {
                      categories.map((category, index) => (
                        <option key={randomId()} value={category.id}>{category.title}</option>
                      ))
                    }
                  </select>
                </div>
              </div>

            </div>
            <div>
              <button type='submit'
                onClick={() => {
                  Modal.success({
                    content: "Add Thành Công",
                    onOk: () => {
                      window.location.href = "/admin";
                    },
                  });
                }}>Tạo Mới</button>
            </div>
          </form>
          <>
            {/* Modal */}
            <div
              key={randomId()}
              className="modal fade"
              id="exampleModal"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >

            </div>
          </>
        </div>
      </div>

    </div>


  );
}

export default App;