
module.exports = async (event, ctx) => {
    console.log('index')
    console.log(process.env.TENCENTCLOUD_SECRETID)
    return {
        name: 'baby'
    }
};