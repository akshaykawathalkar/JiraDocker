AJS.test.require(["jira.webresources:jira-formatter"], function() {

    module("Setup formatter", {
        setup: function () {
            this.metaStub = {
                get: sinon.stub()
            };
            this.mockedContext = AJS.test.mockableModuleContext();
            this.mockedContext.mock('jira/util/data/meta', this.metaStub);
            this.formatter = this.mockedContext.require('jira/util/formatter');
        }
    });

    test("Format integers", function () {
        this.metaStub.get.withArgs('user-locale-group-separator').returns(',');
        equal(this.formatter.formatNumber(1234), "1,234");
        equal(this.formatter.formatNumber(12345), "12,345");
        equal(this.formatter.formatNumber(123456), "123,456");
        equal(this.formatter.formatNumber(1234567), "1,234,567");
        equal(this.formatter.formatNumber(-1234567), "-1,234,567");

        this.metaStub.get.withArgs('user-locale-group-separator').returns('.');
        equal(this.formatter.formatNumber(1234567), "1.234.567");

        this.metaStub.get.withArgs('user-locale-group-separator').returns('');
        equal(this.formatter.formatNumber(1234567), "1234567");
    });
});
