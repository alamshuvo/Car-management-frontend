
import { Link } from "react-router";


const Footer = () => {
    return (
        <div className="  lg:p-10 p-4 bg-colorsa-background mt-5">
            <div className="flex lg:flex-row flex-col md:flex-row md:w-1/2 md:justify-between lg:w-1/2 mx-auto my-10 lg:justify-between items-center">
                <Link to={"/about"}>About</Link>
                <Link to={"/#"}>Blog</Link>
                <Link to={"/#"}>Team</Link>
                <Link to={"/#"}>Pricing</Link>
                <Link to={"/#"}>Contact</Link>
                <Link to={"/#"}>Terms</Link>
            </div>
            <div className="flex flex-col justify-center items-center text-colorsa-text">
                <p>Email:info@CarSopt.com</p>
                <p>Phone:+8801980640702</p>
                <p>Adress: 123 car Street,Car City</p>
                <p>Business Hours: Mon-Sat 9AM - 6PM</p>
            </div>
            <div className="flex justify-center items-center mt-5 gap-5">
    
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20"><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m2.274 6.634h-1.443c-.171 0-.361.225-.361.524V8.6h1.805l-.273 1.486H10.47v4.461H8.767v-4.461H7.222V8.6h1.545v-.874c0-1.254.87-2.273 2.064-2.273h1.443z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20"><path fill="currentColor" d="M12.164 9.852a3.5 3.5 0 0 0-.841-.395a11 11 0 0 0-1.087-.293a16 16 0 0 1-.679-.172a2 2 0 0 1-.396-.158a.9.9 0 0 1-.293-.229a.46.46 0 0 1-.098-.295c0-.188.1-.346.305-.484c.212-.143.499-.215.851-.215q.572 0 .821.193q.256.2.44.562c.106.188.201.318.294.4q.15.136.423.137q.302 0 .505-.217a.7.7 0 0 0 .202-.488c0-.188-.053-.383-.154-.576a1.8 1.8 0 0 0-.477-.553a2.5 2.5 0 0 0-.811-.416a3.8 3.8 0 0 0-1.147-.156c-.55 0-1.035.078-1.443.234c-.413.158-.734.388-.954.683a1.67 1.67 0 0 0-.334 1.023c0 .4.107.74.318 1.012c.207.268.492.482.844.637q.52.226 1.289.396c.374.08.678.158.901.23q.322.103.525.297a.63.63 0 0 1 .189.481c0 .252-.119.457-.363.631c-.251.176-.584.264-.99.264q-.445 0-.714-.131a1.1 1.1 0 0 1-.412-.326a2.6 2.6 0 0 1-.282-.516a1.2 1.2 0 0 0-.289-.434a.63.63 0 0 0-.432-.154a.72.72 0 0 0-.514.195a.65.65 0 0 0-.205.479c0 .295.106.604.315.912q.312.464.81.74c.462.252 1.054.379 1.76.379c.588 0 1.104-.094 1.536-.277c.435-.186.771-.449.998-.779a1.96 1.96 0 0 0 .344-1.129c0-.348-.067-.648-.2-.891a1.7 1.7 0 0 0-.555-.601M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m2.301 14.975c-.487 0-.946-.125-1.348-.348a4.7 4.7 0 0 1-.9.086c-2.713 0-4.914-2.266-4.914-5.057q.001-.525.1-1.018a2.97 2.97 0 0 1-.392-1.481c0-1.619 1.276-2.934 2.851-2.934c.557 0 1.076.166 1.516.451Q9.624 5 10.053 5c2.715 0 4.915 2.264 4.915 5.057q-.001.558-.113 1.084c.189.393.296.834.296 1.303c-.001 1.618-1.276 2.931-2.85 2.931"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20"><path fill="currentColor" d="M11.603 9.833L9.357 8.785C9.161 8.694 9 8.796 9 9.013v1.974c0 .217.161.319.357.228l2.245-1.048c.197-.092.197-.242.001-.334M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m0 13.5c-4.914 0-5-.443-5-3.9s.086-3.9 5-3.9s5 .443 5 3.9s-.086 3.9-5 3.9"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20"><path fill="currentColor" d="M17.316 6.246q.011.244.011.488c0 4.99-3.797 10.742-10.74 10.742c-2.133 0-4.116-.625-5.787-1.697a7.58 7.58 0 0 0 5.588-1.562a3.78 3.78 0 0 1-3.526-2.621a3.86 3.86 0 0 0 1.705-.065a3.78 3.78 0 0 1-3.028-3.703v-.047a3.8 3.8 0 0 0 1.71.473a3.775 3.775 0 0 1-1.168-5.041a10.72 10.72 0 0 0 7.781 3.945a3.8 3.8 0 0 1-.097-.861a3.773 3.773 0 0 1 3.774-3.773a3.77 3.77 0 0 1 2.756 1.191a7.6 7.6 0 0 0 2.397-.916a3.8 3.8 0 0 1-1.66 2.088a7.6 7.6 0 0 0 2.168-.594a7.6 7.6 0 0 1-1.884 1.953"/></svg>
            </div>

            <p className="text-center my-5">2025 CarSpot All Rights Reserved....</p>
        </div>
    );
};

export default Footer;