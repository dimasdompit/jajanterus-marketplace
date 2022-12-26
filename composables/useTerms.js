export default function useTerms() {
  const { $swal } = useNuxtApp()

  const splashBrowser = () => {
    if (process.client) {
      if (!localStorage.getItem("agree-tnc")) {
        $swal.fire({
          title: `<strong class="text-lg text-primary uppercase font-bold">*Disclaimer*</strong>`,
          html: `<p class="text-sm text-gray-600">The products, payments, and logistics displayed or entered on this website are for educational purposes only and should not be relied upon as real or accurate.</p>
          <br/>
          <p class="text-sm text-gray-600">This website is not intended for real transactions or the exchange of any real goods or services.</p>
          <br/>
          <p class="text-sm text-gray-600">Please <strong class="font-bold">DO NOT</strong> enter any real payment information on this website for your own safety and protection.</p>
          <br/>
          <p class="text-sm text-gray-600">If you wish to clear any data that you have entered or stored on this website, you can do so by clearing your browser storage.</p>`,
          allowOutsideClick: false,
          confirmButtonColor: '#059669',
          confirmButtonText: 'AGREE'
        }).then(result => {
          if (result.isConfirmed) {
            localStorage.setItem("agree-tnc", true);
          }
        })
      }
    }
  }

  return { splashBrowser }
}