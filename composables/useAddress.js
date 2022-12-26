export default function useAddress() {
  const { $apiAddressProvider } = useNuxtApp()

  const { address } = useTransactions()

  const provinces = ref([]);
  const cities = ref([]);
  const districts = ref([]);
  const subdistricts = ref([]);
  const zipcodes = ref([]);

  const getProvinces = async () => {
    try {
      const response = await $apiAddressProvider('/provinsi/get');
      provinces.value = response.result;
    } catch (error) {
      console.log(error)
    }
  }

  const getCities = async (event) => {
    try {
      const response = await $apiAddressProvider(`/kabkota/get/?d_provinsi_id=${event}`);
      cities.value = response.result;
    } catch (error) {
      console.log(error)
    }
  }

  const getDistricts = async (event) => {
    try {
      const response = await $apiAddressProvider(`kecamatan/get/?d_kabkota_id=${event}`);
      districts.value = response.result;
    } catch (error) {
      console.log(error)
    }
  }

  const getSubdistricts = async (event) => {
    try {
      const response = await $apiAddressProvider(`kelurahan/get/?d_kecamatan_id=${event}`);
      subdistricts.value = response.result;
    } catch (error) {
      console.log(error)
    }
  }

  const getZipcodes = async () => {
    try {
      const response = await $apiAddressProvider(`https://alamat.thecloudalert.com/api/kodepos/get/?d_kabkota_id=${address.value.city.id}&d_kecamatan_id=${address.value.district.id}`);
      zipcodes.value = response.result;
    } catch (error) {
      console.log(error)
    }
  }

  const changeProvince = (event) => {
    if (event.target.value != 'Choose a province' && provinces.value.length) {
      const data = JSON.parse(event.target.value);
      address.value.province = data;
      getCities(data.id);
    } else {
      address.value.province = null;

      cities.value = [];
      districts.value = [];
      subdistricts.value = [];
      zipcodes.value = [];
    }
  }

  const changeCity = (event) => {
    if (event.target.value != 'Choose a city' && cities.value.length) {
      const data = JSON.parse(event.target.value);
      address.value.city = data;
      getDistricts(data.id);
    } else {
      address.value.city = null;

      districts.value = [];
      subdistricts.value = [];
      zipcodes.value = [];
    }
  }

  const changeDistrict = (event) => {
    if (event.target.value != 'Choose a district' && districts.value.length) {
      const data = JSON.parse(event.target.value);
      address.value.district = data;
      getSubdistricts(data.id);
    } else {
      address.value.district = null;

      subdistricts.value = [];
      zipcodes.value = [];
    }
  }

  const changeSubdistrict = (event) => {
    if (event.target.value != 'Choose a subdistrict' && subdistricts.value.length) {
      const data = JSON.parse(event.target.value);
      address.value.subdistrict = data;
      getZipcodes();
    } else {
      address.value.subdistrict = null;

      zipcodes.value = [];
    }
  }

  onMounted(() => {
    getProvinces()
  })

  return {
    provinces,
    cities,
    districts,
    subdistricts,
    zipcodes,
    changeProvince,
    changeCity,
    changeDistrict,
    changeSubdistrict
  }
}