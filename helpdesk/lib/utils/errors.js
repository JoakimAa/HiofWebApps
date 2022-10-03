import Swal from 'sweetalert2'

export default function createErrorDialog(title, text, icon, timer) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    timer: timer,
    timerProgressBar: true,
  })
}
