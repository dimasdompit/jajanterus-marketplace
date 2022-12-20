export default function useTerms() {
  const { $swal } = useNuxtApp()

  const splashBrowser = () => {
    if (process.client) {
      if (!localStorage.getItem("agree-tnc")) {
        $swal.fire({
          title: `<strong class="text-lg text-primary uppercase font-bold">*Disclaimer*</strong>`,
          html: `<p class="text-sm text-gray-600">Please note that any personal information, payment details, and logistics information entered or displayed on this website is for demonstration purposes only and is not stored to database. This website is for educational and testing purposes only.</p>
          <br/>
          <p class="text-sm text-gray-600">If you wish to clear any data that you have entered, you can do so by clearing your browser storage.</p>
          <br/>
          <p class="text-sm text-gray-600">Please <strong class="font-bold">DO NOT</strong> enter any real personal or financial information on this website. I am not responsible for any loss or damage resulting from the use of this website.</p>`,
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