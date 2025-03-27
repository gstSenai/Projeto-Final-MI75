export default function SobreNos() {
    return (
      <div className="relative bg-gray-100 min-h-screen flex justify-center p-6">
        {/* Seção Sobre Nós */}
        <div className="relative w-full max-w-5xl">
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src="/sobre-nos.jpg" 
              alt="Sobre nós"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center p-6">
              <div className="text-white max-w-md">
                <h2 className="text-3xl font-bold mb-2">Sobre nós</h2>
                <p className="text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }