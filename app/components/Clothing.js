import clothing from "../api/ClothingApi";
import Image from "next/image";
import Shirt from "../../public/shirt.svg"
import Pants from "../../public/jeans.svg"
import Hat from "../../public/winter-hat.svg"
import Shoes from "../../public/sneakers.svg"
import Coat from "../../public/coat.svg"
import Umbrella from "../../public/umbrella.svg"

const Clothing = ({temp, rain}) => {
    const cl = clothing.find((c)=>{
        return temp <= c.temphigh && temp >= c.templow
    })

    const umbrella = (rain) => {
        if(rain == 0.0){
            return "You don't need an umbrella"
        }else if(rain > 1.0){
            return "You should carry an umbrella"
        }else{
            return "You may need an umbrella"
        }
    }
    return(
        <div>
            <table>
                <tbody>
                    <tr>
                        <td><div className="h-align1 cloth-title"><Image src={Shirt} alt="" className="cloth-img"/>Shirt</div></td>
                        <td>{cl.shirt}</td>
                    </tr>
                    <tr>
                        <td><div className="h-align1 cloth-title"><Image src={Pants} alt="" className="cloth-img"/>Pants</div></td>
                        <td>{cl.pants}</td>
                    </tr>
                    <tr>
                        <td><div className="h-align1 cloth-title"><Image src={Shoes} alt="" className="cloth-img"/>Shoes</div></td>
                        <td>{cl.shoes}</td>
                    </tr>
                    <tr>
                        <td><div className="h-align1 cloth-title"><Image src={Hat} alt="" className="cloth-img"/>Accessories</div></td>
                        <td>{cl.acc}</td>
                    </tr>
                    <tr>
                        <td><div className="h-align1 cloth-title"><Image src={Coat} alt="" className="cloth-img"/>Jacket</div></td>
                        <td>{cl.top}</td>
                    </tr>
                    <tr>
                        <td><div className="h-align1 cloth-title"><Image src={Umbrella} alt="" className="cloth-img"/>Umbrella</div></td>
                        <td>{umbrella()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Clothing