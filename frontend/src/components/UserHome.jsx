import { Mail, MapPin, Pencil, Phone } from "lucide-react";

const UserHome = () => {
  return (
    <>
      <div className="grid md:grid-cols-3 flex-1 items-start">
        <div className="col-span-2">{/* <SearchBar /> */}</div>
        <div className="">
          <h2 className="text-2xl font-semibold border-b-2 my-2">
            User Profile
          </h2>
          <div className="flex gap-2 m-4">
            <img
              src="https://picsum.photos/200"
              className="border-2 border-black rounded-lg h-[50px] w-[50px]"
            />
            <div className="flex col-span-3 flex-col">
              <h3 className="text-lg line-clamp-1 font-semibold items-center">
                John Doe
              </h3>
              <p>Admin</p>
            </div>
          </div>
          <div className="grid gap-2 m-4">
            <div className="flex gap-2 items-start">
              <MapPin size={20} />
              <div className="leading-4">
                123 1232, asdfasdf, fasdfasdf, asdfasdf
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <Phone size={20} />
              <div>+91 9876543012</div>
            </div>
            <div className="flex gap-2 items-center">
              <Mail size={20} />
              <div>mail@example.com</div>
            </div>
            <div className="flex gap-2 items-center">
              <Pencil size={20} />
              <div>Edit Information</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
