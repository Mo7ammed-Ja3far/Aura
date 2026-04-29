import React from "react";
import sm from "../assets/group_profiles.png";
import mainImg from "../assets/doc-header-img.png";
import mainImgSpeciality from "../assets/General_physician.png";
import Title from "../components/homeComponents/title";
function Home() {
  const Speciality = [
    {
      id: 1,
      name: "General physician",
      img: mainImgSpeciality,
    },
    {
      id: 2,
      name: "Gynecologist",
      img: mainImgSpeciality,
    },
    {
      id: 3,
      name: "Dermatologist",
      img: mainImgSpeciality,
    },
    {
      id: 4,
      name: "Pediatricians",
      img: mainImgSpeciality,
    },
    {
      id: 5,
      name: "Neurologist",
      img: mainImgSpeciality,
    },
    {
      id: 6,
      name: "Gastroenterologist",
      img: mainImgSpeciality,
    },
  ];

  return (
    <>
      <div className="bg-primary max-w-[1525px] h-[698px] mx-auto rounded-[10px] mt-[25px] flex items-end ">
        <div className="h-full flex-1 flex flex-col justify-center items-start gap-[30px] relative left-[96px]">
          <h2 className="font-semibold text-white text-[63px] relative top-[-14px]  leading-[80px]">
            Book Appointment With Trusted Doctors
          </h2>
          <div className="flex flex-row gap-[20px] items-center justify-center">
            <div className=" ">
              <img src={sm} className="w-[130px] " alt="" />
            </div>
            <p className="text-white text-[20px] leading-[30px]">
              Simply browse through our extensive list of trusted doctors,
              schedule your appointment hassle-free.
            </p>
          </div>
          <button className="btn bg-white text-p-[#595959] w-[240px] h-[63px] flex items-center justify-center rounded-[50px] text-[18px] font-medium cursor-pointer">
            Book appointment{" "}
            <svg
              className="inline-block relative left-[10px]"
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6H15M15 6L10.8378 1M15 6L10.8378 11"
                stroke="#595959"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <img src={mainImg} className="w-[882px]" alt="main img" />
        {/* <div className="mainImg">
        </div> */}
      </div>
      <Title
        title="Find by Speciality"
        paragraph="Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free."
      />
      <div className="Speciality mt-17.5">
        <ul className="flex gap-8.75 items-center justify-center ">
          {Speciality.map((spec) => {
            return (
              <li
                key={spec.id}
                className="  flex flex-col justify-between items-center text-center gap-5"
              >
                <img src={spec.img} alt={spec.name} />
                <p>{spec.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Home;
