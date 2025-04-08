import Image from "next/image"
import Sunrise from "../../public/weather/fill/svg/sunrise.svg";
import Sunset from "../../public/weather/fill/svg/sunset.svg";
import Moonrise from "../../public/weather/fill/svg/moonrise.svg";
import Moonset from "../../public/weather/fill/svg/moonset.svg";

const Astronomy = ({sunrise, sunset, moonrise, moonset}) => {
    const imgSize = 50
    return(
        <div>
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <div className="h-align">
                                  <Image src={Sunrise} alt="" width={imgSize} height={imgSize} />
                                  Sunrise
                                </div>
                              </td>
                              <td>{sunrise}</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="h-align">
                                  <Image src={Sunset} alt="" width={imgSize} height={imgSize} />
                                  Sunset
                                </div>
                              </td>
                              <td>{sunset}</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="h-align">
                                  <Image src={Moonrise} alt="" width={imgSize} height={imgSize} />
                                  Moonrise
                                </div>
                              </td>
                              <td>{moonrise}</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="h-align">
                                  <Image src={Moonset} alt="" width={imgSize} height={imgSize} />
                                  Moonset
                                </div>
                              </td>
                              <td>{moonset}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
    )
}

export default Astronomy