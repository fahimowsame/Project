

function Footer() {
    return (
      <footer className="footer bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-5/12 mb-8 md:mb-0">
              <h5 className="text-xl font-bold text-gray-300 flex items-center">
                <i className="fa fa-road mr-2"></i> ACME CO INC.
              </h5>
              <div className="flex mt-4">
                <div className="w-1/2">
                  <ul className="list-none space-y-2">
                    <li><p className="hover:text-gray-300">Product</p></li>
                    <li><p className="hover:text-gray-300">Benefits</p></li>
                    <li><p className="hover:text-gray-300">Partners</p></li>
                    <li><p className="hover:text-gray-300">Team</p></li>
                  </ul>
                </div>
                <div className="w-1/2">
                  <ul className="list-none space-y-2">
                    <li><p className="hover:text-gray-300">Documentation</p></li>
                    <li><p className="hover:text-gray-300">Support</p></li>
                    <li><p className="hover:text-gray-300">Legal Terms</p></li>
                    <li><p className="hover:text-gray-300">About</p></li>
                  </ul>
                </div>
              </div>
              
            </div>
            <div className="w-full md:w-2/12 mb-8 md:mb-0 text-right pr-9">
              <h5 className="text-xl font-bold text-gray-300">Contact Us</h5>
              <hr className="border-gray-600 my-2" />
            </div>
            <div className="w-full md:w-4/12">
              <form>
                <div className="mb-4">
                  <input
                    type="email"
                    className="form-control bg-gray-800 text-gray-300 w-full p-1"
                    placeholder="Enter email"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    className="form-control bg-gray-800 text-gray-300 w-full p-3"
                    placeholder="Message"
                  ></textarea>
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    className="btn btn-outline-secondary text-lg bg-transparent text-gray-300 py-2 px-4 border border-gray-600"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer