/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */

'use strict';

var SyntheticClipboardEvent;

describe('SyntheticClipboardEvent', () => {
  var createEvent;

  beforeEach(() => {
    // TODO: can we express this test with only public API?
    SyntheticClipboardEvent = require('../SyntheticClipboardEvent').default;
    createEvent = function(nativeEvent) {
      var target = require('../getEventTarget').default(nativeEvent);
      return SyntheticClipboardEvent.getPooled({}, '', nativeEvent, target);
    };
  });

  describe('ClipboardEvent interface', () => {
    describe('clipboardData', () => {
      describe('when event has clipboardData', () => {
        it("returns event's clipboardData", () => {
          // Mock clipboardData since native implementation doesn't have a constructor
          var clipboardData = {
            dropEffect: null,
            effectAllowed: null,
            files: null,
            items: null,
            types: null,
          };
          var clipboardEvent = createEvent({clipboardData: clipboardData});

          expect(clipboardEvent.clipboardData).toBe(clipboardData);
        });
      });
    });
  });

  describe('EventInterface', () => {
    it('is able to `preventDefault` and `stopPropagation`', () => {
      var nativeEvent = {};
      var syntheticEvent = createEvent(nativeEvent);

      expect(syntheticEvent.isDefaultPrevented()).toBe(false);
      syntheticEvent.preventDefault();
      expect(syntheticEvent.isDefaultPrevented()).toBe(true);

      expect(syntheticEvent.isPropagationStopped()).toBe(false);
      syntheticEvent.stopPropagation();
      expect(syntheticEvent.isPropagationStopped()).toBe(true);
    });

    it('is able to `persist`', () => {
      var syntheticEvent = createEvent({});

      expect(syntheticEvent.isPersistent()).toBe(false);
      syntheticEvent.persist();
      expect(syntheticEvent.isPersistent()).toBe(true);
    });
  });
});
