const moment = require('moment')

module.exports = {
    formatDate: (date, format) => moment(date).format(format),
    getStatusBadge: (status) => status === 'public' ? `<span class="badge text-bg-primary px-3">${status}</span>` : `<span class="badge text-bg-danger px-3">${status}</span>`,
    truncate: (str, len) => {
        if(str.length > len && str.length > 0) {
            let text = str + ' '
            text = str.substr(0, len)
            text = str.substr(0, text.lastIndexOf(' '))
            text = text.length > 0 ? text : str.substr(0, len)

            return text + "..."
        }
        return str
    }
}